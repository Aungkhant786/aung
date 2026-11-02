import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft, Terminal, AlertTriangle } from 'lucide-react';
import { AdminSqlHelperModal } from './AdminSqlHelperModal';
import { LanguageToggle } from '../common/LanguageToggle';

interface AdminLoginProps {
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite }) => {
  const {
    isConfigured,
    signInAdmin,
    authLoading,
    authError,
    authWarning,
    user,
    signOutAdmin,
  } = useSalon();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await signInAdmin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Top action row */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 flex items-center justify-between">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#726861] hover:text-[#241F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Salon Website</span>
        </button>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-[#9E6D59] hover:underline"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SQL Guide</span>
          </button>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#241F1C] text-[#FAF8F5] mx-auto flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6 text-[#D9A592]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
            Salon Management
          </h2>
          <p className="text-xs text-[#726861]">
            Yarpyae Beauty Salon · No 44, Yadanagu Pagoda Road, Amarapura
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8DFD7] shadow-xl">
          {/* Supabase connection warning banner if not yet set in .env.local */}
          {!isConfigured && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Supabase Configuration Notice</span>
              </div>
              <p className="leading-relaxed">
                Add your Supabase credentials to <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">.env.local</code>:
              </p>
              <pre className="p-2 bg-white rounded font-mono text-[10px] text-[#241F1C] overflow-x-auto border border-amber-200">
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
              </pre>
              <button
                type="button"
                onClick={() => setIsSqlModalOpen(true)}
                className="inline-flex items-center gap-1 font-semibold text-amber-900 underline text-[11px]"
              >
                View SQL table migration script →
              </button>
            </div>
          )}

          {/* User is authenticated in Supabase but not listed in admin_users */}
          {authWarning && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2.5">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{authWarning}</span>
              </div>
              {user && (
                <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-[11px] text-[#241F1C] space-y-1">
                  <p>Authenticated Supabase User ID:</p>
                  <p className="font-mono text-[10px] break-all text-[#9E6D59] font-bold">{user.id}</p>
                  <p className="text-[10px] text-[#726861] pt-1">
                    To authorize this user as an admin, run this in Supabase SQL editor:
                  </p>
                  <code className="block bg-[#FAF8F5] p-1.5 rounded font-mono text-[10px]">
                    INSERT INTO admin_users (user_id) VALUES ('{user.id}');
                  </code>
                </div>
              )}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={signOutAdmin}
                  className="text-xs font-semibold text-amber-900 hover:underline"
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={() => setIsSqlModalOpen(true)}
                  className="text-xs text-[#9E6D59] hover:underline"
                >
                  View Schema SQL
                </button>
              </div>
            </div>
          )}

          {/* Login Error Feedback */}
          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9E6D59]" />
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@glowandglam.com"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#9E6D59]" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 transition-all rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span>Verifying Credentials & Permissions...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#D9A592]" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F2EBE5] text-center">
            <p className="text-[11px] text-[#726861] leading-relaxed">
              Authorized salon personnel only. Access is verified against the <code className="font-mono text-[#241F1C]">admin_users</code> registry in Supabase.
            </p>
          </div>
        </div>
      </div>

      <AdminSqlHelperModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
};
