import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Clock,
  CalendarOff,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Menu,
  X,
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { AdminAppointments } from './AdminAppointments';
import { AdminServices } from './AdminServices';
import { AdminBusinessHours } from './AdminBusinessHours';
import { AdminBlockedDates } from './AdminBlockedDates';
import { AdminBusinessSettings } from './AdminBusinessSettings';
import { AdminSqlHelperModal } from './AdminSqlHelperModal';
import { LanguageToggle } from '../common/LanguageToggle';

type AdminTab = 'overview' | 'appointments' | 'services' | 'hours' | 'blocked' | 'settings';

interface AdminLayoutProps {
  onBackToWebsite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToWebsite }) => {
  const { user, signOutAdmin, businessSettings } = useSalon();
  const { t } = useLanguage();

  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: t.admin.overview, icon: LayoutDashboard },
    { id: 'appointments', label: t.admin.appointments, icon: CalendarDays },
    { id: 'services', label: t.admin.services, icon: Sparkles },
    { id: 'hours', label: t.admin.hours, icon: Clock },
    { id: 'blocked', label: t.admin.blocked, icon: CalendarOff },
    { id: 'settings', label: t.admin.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#241F1C] text-white px-4 py-3 flex items-center justify-between border-b border-[#3B2C24]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D9A592]" />
          <span className="font-serif font-medium text-sm">{businessSettings.business_name || 'Yarpyae Beauty Salon'}</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle variant="admin" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-[#241F1C] text-[#FAF8F5] p-5 flex flex-col justify-between shrink-0 border-r border-[#3B2C24] z-20`}
      >
        <div className="space-y-6">
          {/* Brand Wordmark & Language switch */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#3B2C24] flex items-center justify-center text-[#D9A592]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="font-serif text-lg font-medium tracking-tight text-white">
                  {businessSettings.business_name || 'Yarpyae Beauty'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-[#A89E96] tracking-wide">
                {t.admin.dashboardTitle}
              </p>
              <LanguageToggle variant="admin" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FAF8F5] text-[#241F1C] shadow-sm font-semibold'
                      : 'text-[#D1C7BD] hover:bg-[#342D28] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#9E6D59]' : 'text-[#D9A592]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#D9A592] hover:text-white transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Supabase Schema SQL</span>
          </button>

          <button
            onClick={onBackToWebsite}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#D1C7BD] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#A89E96]" />
            <span>{t.admin.returnToWeb}</span>
          </button>

          {user && (
            <div className="px-3 py-2 bg-[#1A1614] rounded-xl text-[11px] text-[#A89E96] truncate">
              <span className="block text-white/90 truncate font-mono text-[10px]">{user.email}</span>
              <span className="text-emerald-400 font-medium">Authorized Admin</span>
            </div>
          )}

          <button
            onClick={signOutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-300 hover:text-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {currentTab === 'overview' && <AdminOverview onNavigate={setCurrentTab} />}
        {currentTab === 'appointments' && <AdminAppointments />}
        {currentTab === 'services' && <AdminServices />}
        {currentTab === 'hours' && <AdminBusinessHours />}
        {currentTab === 'blocked' && <AdminBlockedDates />}
        {currentTab === 'settings' && <AdminBusinessSettings />}
      </main>

      <AdminSqlHelperModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
};
