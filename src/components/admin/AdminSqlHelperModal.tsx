import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';

interface AdminSqlHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSqlHelperModal: React.FC<AdminSqlHelperModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const sqlScript = `-- ========================================================
-- YARPYAE BEAUTY SALON - SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Business Settings table
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL DEFAULT 'Yarpyae Beauty Salon',
  business_email TEXT NOT NULL DEFAULT 'hello@yarpyaebeautysalon.com',
  business_phone TEXT NOT NULL DEFAULT '+95 9 789 223 344',
  business_address TEXT NOT NULL DEFAULT 'No 44, Yadanagu Pagoda Road, Amarapura',
  slot_interval_minutes INTEGER NOT NULL DEFAULT 30,
  booking_notice_hours INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Business Hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday INTEGER NOT NULL UNIQUE,
  is_open BOOLEAN NOT NULL DEFAULT true,
  start_time TIME NOT NULL DEFAULT '09:00:00',
  end_time TIME NOT NULL DEFAULT '19:00:00'
);

-- 4. Blocked Dates table
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE RESTRICT,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Admin Users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = true OR auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admin manage services" ON services FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Public read business settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Admin manage business settings" ON business_settings FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Public read business hours" ON business_hours FOR SELECT USING (true);
CREATE POLICY "Admin manage business hours" ON business_hours FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Public read blocked dates" ON blocked_dates FOR SELECT USING (true);
CREATE POLICY "Admin manage blocked dates" ON blocked_dates FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage appointments" ON appointments FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins check own status" ON admin_users FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage admin_users" ON admin_users FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- SEED DATA
INSERT INTO business_settings (business_name, business_email, business_phone, business_address, slot_interval_minutes, booking_notice_hours)
VALUES ('Yarpyae Beauty Salon', 'hello@yarpyaebeautysalon.com', '+95 9 789 223 344', 'No 44, Yadanagu Pagoda Road, Amarapura', 30, 2)
ON CONFLICT DO NOTHING;

INSERT INTO business_hours (weekday, is_open, start_time, end_time) VALUES
(0, true, '10:00:00', '16:00:00'),
(1, true, '09:00:00', '19:00:00'),
(2, true, '09:00:00', '19:00:00'),
(3, true, '09:00:00', '19:00:00'),
(4, true, '09:00:00', '19:00:00'),
(5, true, '09:00:00', '19:00:00'),
(6, true, '09:00:00', '19:00:00')
ON CONFLICT (weekday) DO NOTHING;

INSERT INTO services (name, description, duration_minutes, price, is_active) VALUES
('Signature Facial', 'A deeply restorative ritual combining botanical lymphatic drainage, gentle deep pore extractions, enzyme fruit exfoliation, and chilled rose quartz contouring.', 75, 85, true),
('Full Makeup Session', 'Bespoke event and gala makeup with custom skin priming, seamless airbrush or cream base, tailored eye styling, and long-wear sealing.', 60, 110, true),
('Brow Shaping & Tint', 'Architectural brow mapping tailored to your face structure, precision organic thread or wax sculpting, and botanical henna or tint infusion.', 30, 45, true),
('Lash Lift & Tint', 'Nourishing keratin lash lift that dramatically enhances your natural lashes, paired with a rich obsidian gloss tint lasting 6 to 8 weeks.', 45, 65, true),
('Bridal Consultation', 'An exclusive private consultation including skin diagnostic, veil and neckline harmonization, color palette design, and complete bridal trial application.', 90, 135, true)
ON CONFLICT DO NOTHING;
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border border-[#EAE3DC] shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#241F1C] text-[#FAF8F5] flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#241F1C]">
                Supabase SQL Setup Script
              </h3>
              <p className="text-xs text-[#726861]">
                Execute this in your Supabase Project SQL Editor to bootstrap all tables and policies.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#726861] hover:text-[#241F1C] hover:bg-[#EFE3DA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="my-4 p-4 rounded-xl bg-[#FAF3EE] border border-[#EAE0D6] space-y-2 text-xs text-[#6E635C]">
          <div className="flex items-center gap-1.5 font-semibold text-[#241F1C]">
            <ShieldAlert className="w-4 h-4 text-[#9E6D59]" />
            <span>How to Grant Admin Access in Supabase</span>
          </div>
          <p>
            1. Create a user in Supabase Auth (or via Email Signup).
          </p>
          <p>
            2. Copy their <code className="bg-white px-1 py-0.5 rounded border">auth.users.id</code> and run:
            <code className="block mt-1 p-2 bg-white rounded font-mono text-[11px] text-[#241F1C] border">
              INSERT INTO admin_users (user_id) VALUES ('your-user-uuid-here');
            </code>
          </p>
        </div>

        {/* SQL Code Block */}
        <div className="relative flex-1 overflow-hidden rounded-xl border border-[#E8DFD7] bg-[#1E1B18] text-[#F3EFEA] font-mono text-xs flex flex-col">
          <div className="p-3 bg-[#151210] border-b border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-[#A89E96]">glow_and_glam_schema.sql</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-72">
            <pre className="whitespace-pre">{sqlScript}</pre>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-[#EAE3DC]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] transition-colors rounded-xl shadow-xs"
          >
            Close Helper
          </button>
        </div>
      </div>
    </div>
  );
};
