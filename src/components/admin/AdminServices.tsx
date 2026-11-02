import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Service } from '../../types';
import { Plus, Edit2, Clock, Check, X, Sparkles, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, toggleServiceActive } = useSalon();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [price, setPrice] = useState<number>(75);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setDurationMinutes(60);
    setPrice(85);
    setIsActive(true);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description || '');
    setDurationMinutes(service.duration_minutes);
    setPrice(service.price);
    setIsActive(service.is_active);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Service name is required.');
      return;
    }
    if (durationMinutes <= 0) {
      setError('Duration must be greater than 0 minutes.');
      return;
    }
    if (price < 0) {
      setError('Price must be a valid positive amount.');
      return;
    }

    setSaving(true);
    setError(null);

    let ok = false;
    if (editingService) {
      ok = await updateService(editingService.id, {
        name: name.trim(),
        description: description.trim() || null,
        duration_minutes: durationMinutes,
        price,
        is_active: isActive,
      });
    } else {
      ok = await addService({
        name: name.trim(),
        description: description.trim() || null,
        duration_minutes: durationMinutes,
        price,
        is_active: isActive,
      });
    }

    setSaving(false);

    if (ok) {
      setIsModalOpen(false);
    } else {
      setError('Failed to save service changes. Please check your Supabase connection.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
            Services Management
          </h2>
          <p className="text-xs text-[#726861] mt-0.5">
            Add, modify treatment duration, prices, and toggle visibility on the public booking menu.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#241F1C] hover:bg-[#3B2C24] text-white text-xs font-semibold rounded-xl shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D9A592]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List / Table */}
      <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 pb-4 border-b border-[#F2EBE5] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#726861]">
            Total Registered Services ({services.length})
          </span>
          <span className="text-xs text-[#726861]">
            Active on booking: <strong className="text-[#241F1C]">{services.filter((s) => s.is_active).length}</strong>
          </span>
        </div>

        <div className="divide-y divide-[#F2EBE5]">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-5 sm:p-6 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !service.is_active ? 'bg-slate-50/70 opacity-75' : 'hover:bg-[#FAF8F5]/60'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg font-medium text-[#241F1C]">
                    {service.name}
                  </h3>
                  {service.is_active ? (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      Inactive (Hidden from booking)
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6E635C] leading-relaxed max-w-2xl">
                  {service.description || 'No description provided.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#726861] pt-1">
                  <span className="flex items-center gap-1 font-medium text-[#241F1C]">
                    <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
                    <span className="tabular-nums">{service.duration_minutes}</span> minutes
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-serif font-bold text-sm text-[#241F1C] tabular-nums">
                    ${service.price}
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-[#F2EBE5] shrink-0">
                {/* Active / Inactive Toggle Button */}
                <button
                  onClick={() => toggleServiceActive(service.id, !service.is_active)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    service.is_active
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                  title={service.is_active ? 'Click to deactivate' : 'Click to activate'}
                >
                  {service.is_active ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-500" />
                      <span>Deactivated</span>
                    </>
                  )}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(service)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-white text-[#241F1C] border border-[#DDD0C5] hover:border-[#241F1C] rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#9E6D59]" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-[#EAE3DC] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#726861] hover:text-[#241F1C] hover:bg-[#EFE3DA] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-4 border-b border-[#EAE3DC]">
              <div className="w-8 h-8 rounded-lg bg-[#241F1C] text-[#FAF8F5] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D9A592]" />
              </div>
              <h3 className="font-serif text-xl text-[#241F1C]">
                {editingService ? 'Edit Treatment Service' : 'Add New Treatment Service'}
              </h3>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24K Gold Restorative Facial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe treatment benefits, steps, and botanicals..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    min={15}
                    step={15}
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={5}
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#241F1C] focus:ring-[#C69F77]"
                  />
                  <span className="text-xs font-medium text-[#241F1C]">
                    Active (Display this service on public booking website)
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EAE3DC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#726861] hover:text-[#241F1C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 rounded-xl shadow-xs transition-colors"
                >
                  {saving ? 'Saving to Supabase...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
