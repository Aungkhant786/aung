import { BusinessHours, BusinessSettings, Service } from '../types';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  id: 'default-settings',
  business_name: 'Glow & Glam Beauty Salon & Spa',
  business_email: 'hello@glowandglam.com',
  business_phone: '+95 9 789 223 344',
  business_address: 'Sanchaung, Yangon',
  slot_interval_minutes: 30,
  booking_notice_hours: 2,
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Signature Facial',
    description: 'A deeply restorative ritual combining botanical lymphatic drainage, gentle deep pore extractions, enzyme fruit exfoliation, and chilled rose quartz contouring.',
    duration_minutes: 75,
    price: 85,
    is_active: true,
  },
  {
    id: 'srv-2',
    name: 'Full Makeup Session',
    description: 'Bespoke event and gala makeup with custom skin priming, seamless airbrush or cream base, tailored eye styling, and long-wear sealing.',
    duration_minutes: 60,
    price: 110,
    is_active: true,
  },
  {
    id: 'srv-3',
    name: 'Brow Shaping & Tint',
    description: 'Architectural brow mapping tailored to your face structure, precision organic thread or wax sculpting, and botanical henna or tint infusion.',
    duration_minutes: 30,
    price: 45,
    is_active: true,
  },
  {
    id: 'srv-4',
    name: 'Lash Lift & Tint',
    description: 'Nourishing keratin lash lift that dramatically enhances your natural lashes, paired with a rich obsidian gloss tint lasting 6 to 8 weeks.',
    duration_minutes: 45,
    price: 65,
    is_active: true,
  },
  {
    id: 'srv-5',
    name: 'Bridal Consultation',
    description: 'An exclusive private consultation including skin diagnostic, veil and neckline harmonization, color palette design, and complete bridal trial application.',
    duration_minutes: 90,
    price: 135,
    is_active: true,
  },
];

export const DEFAULT_BUSINESS_HOURS: BusinessHours[] = [
  { id: 'bh-0', weekday: 0, is_open: true, start_time: '10:00:00', end_time: '16:00:00' }, // Sunday
  { id: 'bh-1', weekday: 1, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Monday
  { id: 'bh-2', weekday: 2, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Tuesday
  { id: 'bh-3', weekday: 3, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Wednesday
  { id: 'bh-4', weekday: 4, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Thursday
  { id: 'bh-5', weekday: 5, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Friday
  { id: 'bh-6', weekday: 6, is_open: true, start_time: '09:00:00', end_time: '19:00:00' }, // Saturday
];

export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
