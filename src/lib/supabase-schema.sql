-- ========================================================
-- GLOW & GLAM BEAUTY SALON & SPA
-- SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ========================================================

-- Enable UUID extension
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

-- 2. Business Settings table (Salon business information)
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL DEFAULT 'Glow & Glam Beauty Salon & Spa',
  business_email TEXT NOT NULL DEFAULT 'hello@glowandglam.com',
  business_phone TEXT NOT NULL DEFAULT '+95 9 789 223 344',
  business_address TEXT NOT NULL DEFAULT 'Sanchaung, Yangon',
  slot_interval_minutes INTEGER NOT NULL DEFAULT 30,
  booking_notice_hours INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Business Hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday INTEGER NOT NULL UNIQUE, -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
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

-- 6. Admin Users table (Maps Supabase Auth user_id)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Services Policies
-- Public can view active services; Admins can view all
CREATE POLICY "Public read active services" ON services 
  FOR SELECT USING (is_active = true OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admin manage services" ON services 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Business Settings Policies
CREATE POLICY "Public read business settings" ON business_settings 
  FOR SELECT USING (true);

CREATE POLICY "Admin manage business settings" ON business_settings 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Business Hours Policies
CREATE POLICY "Public read business hours" ON business_hours 
  FOR SELECT USING (true);

CREATE POLICY "Admin manage business hours" ON business_hours 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Blocked Dates Policies
CREATE POLICY "Public read blocked dates" ON blocked_dates 
  FOR SELECT USING (true);

CREATE POLICY "Admin manage blocked dates" ON blocked_dates 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Appointments Policies:
-- 1. Public users can ONLY insert appointments (NO SELECT permitted to protect client privacy)
CREATE POLICY "Public insert appointments" ON appointments 
  FOR INSERT WITH CHECK (true);

-- 2. Authenticated admins can view, update, delete appointments
CREATE POLICY "Admin manage appointments" ON appointments 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Admin Users Policies
CREATE POLICY "Admins check own status" ON admin_users 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins manage admin_users" ON admin_users 
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- ========================================================
-- INITIAL SEED DATA
-- ========================================================

-- Salon business settings
INSERT INTO business_settings (business_name, business_email, business_phone, business_address, slot_interval_minutes, booking_notice_hours)
VALUES ('Glow & Glam Beauty Salon & Spa', 'hello@glowandglam.com', '+95 9 789 223 344', 'Sanchaung, Yangon', 30, 2)
ON CONFLICT DO NOTHING;

-- Business hours (Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 4:00 PM)
INSERT INTO business_hours (weekday, is_open, start_time, end_time) VALUES
(0, true, '10:00:00', '16:00:00'), -- Sunday
(1, true, '09:00:00', '19:00:00'), -- Monday
(2, true, '09:00:00', '19:00:00'), -- Tuesday
(3, true, '09:00:00', '19:00:00'), -- Wednesday
(4, true, '09:00:00', '19:00:00'), -- Thursday
(5, true, '09:00:00', '19:00:00'), -- Friday
(6, true, '09:00:00', '19:00:00')  -- Saturday
ON CONFLICT (weekday) DO NOTHING;

-- Initial showcase services
INSERT INTO services (name, description, duration_minutes, price, is_active) VALUES
('Signature Facial', 'A deeply restorative ritual combining botanical lymphatic drainage, gentle deep pore extractions, enzyme fruit exfoliation, and chilled rose quartz contouring.', 75, 85, true),
('Full Makeup Session', 'Bespoke event and gala makeup with custom skin priming, seamless airbrush or cream base, tailored eye styling, and long-wear sealing.', 60, 110, true),
('Brow Shaping & Tint', 'Architectural brow mapping tailored to your face structure, precision organic thread or wax sculpting, and botanical henna or tint infusion.', 30, 45, true),
('Lash Lift & Tint', 'Nourishing keratin lash lift that dramatically enhances your natural lashes, paired with a rich obsidian gloss tint lasting 6 to 8 weeks.', 45, 65, true),
('Bridal Consultation', 'An exclusive private consultation including skin diagnostic, veil and neckline harmonization, color palette design, and complete bridal trial application.', 90, 135, true)
ON CONFLICT DO NOTHING;
