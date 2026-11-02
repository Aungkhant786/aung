import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Appointment,
  BlockedDate,
  BusinessHours,
  BusinessSettings,
  Service,
} from '../types';
import {
  DEFAULT_BUSINESS_HOURS,
  DEFAULT_BUSINESS_SETTINGS,
  DEFAULT_SERVICES,
} from '../lib/defaultData';

interface SalonContextType {
  // Config status
  isConfigured: boolean;

  // Data
  services: Service[];
  activeServices: Service[];
  businessSettings: BusinessSettings;
  businessHours: BusinessHours[];
  blockedDates: BlockedDate[];
  appointments: Appointment[];

  // Loading states
  loadingInitialData: boolean;
  loadingAppointments: boolean;

  // Auth & Admin state
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  authError: string | null;
  authWarning: string | null;

  // Actions
  signInAdmin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signOutAdmin: () => Promise<void>;
  createAppointment: (appointment: {
    fullName: string;
    email: string;
    phone: string;
    serviceId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) => Promise<{ success: boolean; error?: string }>;

  // Admin management actions
  refreshAppointments: () => Promise<void>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<boolean>;
  addService: (newService: Omit<Service, 'id' | 'created_at'>) => Promise<boolean>;
  updateService: (id: string, updates: Partial<Service>) => Promise<boolean>;
  toggleServiceActive: (id: string, isActive: boolean) => Promise<boolean>;
  updateBusinessHours: (hours: BusinessHours[]) => Promise<boolean>;
  addBlockedDate: (date: string, reason: string) => Promise<boolean>;
  removeBlockedDate: (id: string) => Promise<boolean>;
  updateBusinessSettings: (updates: Partial<BusinessSettings>) => Promise<boolean>;
  seedInitialDataToSupabase: () => Promise<{ success: boolean; message: string }>;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(DEFAULT_BUSINESS_SETTINGS);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>(DEFAULT_BUSINESS_HOURS);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [loadingInitialData, setLoadingInitialData] = useState<boolean>(true);
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(false);

  // Auth & Admin states
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authWarning, setAuthWarning] = useState<string | null>(null);

  // Check admin authorization in admin_users table
  const checkAdminAccess = useCallback(async (userId: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      return false;
    }
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Error querying admin_users:', error.message);
        return false;
      }
      return Boolean(data && data.user_id === userId);
    } catch (err) {
      console.warn('Exception checking admin access:', err);
      return false;
    }
  }, []);

  // Fetch Public Salon Data from Supabase
  const loadPublicData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoadingInitialData(false);
      return;
    }

    try {
      // 1. Fetch Services
      const { data: servicesData, error: sError } = await supabase
        .from('services')
        .select('*')
        .order('price', { ascending: true });

      if (!sError && servicesData && servicesData.length > 0) {
        setServices(servicesData);
      }

      // 2. Fetch Business Settings
      const { data: settingsData, error: setErr } = await supabase
        .from('business_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!setErr && settingsData) {
        setBusinessSettings(settingsData);
      }

      // 3. Fetch Business Hours
      const { data: hoursData, error: hErr } = await supabase
        .from('business_hours')
        .select('*')
        .order('weekday', { ascending: true });

      if (!hErr && hoursData && hoursData.length > 0) {
        setBusinessHours(hoursData);
      }

      // 4. Fetch Blocked Dates
      const { data: blockedData, error: bErr } = await supabase
        .from('blocked_dates')
        .select('*')
        .order('blocked_date', { ascending: true });

      if (!bErr && blockedData) {
        setBlockedDates(blockedData);
      }
    } catch (err) {
      console.warn('Error loading public salon data from Supabase:', err);
    } finally {
      setLoadingInitialData(false);
    }
  }, []);

  // Fetch Appointments (Admin only)
  const refreshAppointments = useCallback(async () => {
    if (!isSupabaseConfigured || !isAdmin) {
      return;
    }
    setLoadingAppointments(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(*)')
        .order('appointment_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (!error && data) {
        setAppointments(data as Appointment[]);
      }
    } catch (err) {
      console.warn('Error fetching appointments:', err);
    } finally {
      setLoadingAppointments(false);
    }
  }, [isAdmin]);

  // Load appointments whenever admin status turns true
  useEffect(() => {
    if (isAdmin) {
      refreshAppointments();
    }
  }, [isAdmin, refreshAppointments]);

  // Initialize Auth & Session listener
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      setAuthLoading(true);
      setAuthError(null);
      setAuthWarning(null);

      if (!isSupabaseConfigured) {
        if (isMounted) {
          setAuthLoading(false);
        }
        return;
      }

      try {
        // Step 1: getSession
        const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) {
          console.warn('Session query error:', sessionErr.message);
        }

        const initialSession = sessionData?.session ?? null;
        if (!isMounted) return;
        setSession(initialSession);

        if (!initialSession) {
          setIsAdmin(false);
          setUser(null);
          return;
        }

        // Step 2: getUser
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData.user) {
          setIsAdmin(false);
          setUser(null);
          return;
        }

        setUser(userData.user);

        // Step 3: Check admin_users
        const authorized = await checkAdminAccess(userData.user.id);
        if (!isMounted) return;

        if (authorized) {
          setIsAdmin(true);
          setAuthWarning(null);
        } else {
          setIsAdmin(false);
          setAuthWarning('You are signed in, but you are not authorized as an admin.');
        }
      } catch (err) {
        console.warn('Authentication verification exception:', err);
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    initAuth();
    loadPublicData();

    // Listen to Auth State Changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);

      if (event === 'SIGNED_OUT' || !newSession) {
        setUser(null);
        setIsAdmin(false);
        setAuthWarning(null);
        setAuthLoading(false);
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        const currentUser = newSession.user;
        setUser(currentUser);
        if (currentUser) {
          const authorized = await checkAdminAccess(currentUser.id);
          if (isMounted) {
            if (authorized) {
              setIsAdmin(true);
              setAuthWarning(null);
            } else {
              setIsAdmin(false);
              setAuthWarning('You are signed in, but you are not authorized as an admin.');
            }
          }
        }
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [checkAdminAccess, loadPublicData]);

  // Admin Sign In
  const signInAdmin = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    setAuthLoading(true);
    setAuthError(null);
    setAuthWarning(null);

    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      const msg = 'Supabase credentials are not configured yet in .env.local. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
      setAuthError(msg);
      return { success: false, message: msg };
    }

    try {
      // 1. signInWithPassword
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        setAuthError(error.message);
        return { success: false, message: error.message };
      }

      if (!data.user) {
        const msg = 'User not found in authentication service.';
        setAuthError(msg);
        return { success: false, message: msg };
      }

      setUser(data.user);
      setSession(data.session);

      // 2. Check admin_users.user_id
      const authorized = await checkAdminAccess(data.user.id);
      if (authorized) {
        setIsAdmin(true);
        setAuthWarning(null);
        return { success: true };
      } else {
        setIsAdmin(false);
        const warning = 'You are signed in, but you are not authorized as an admin.';
        setAuthWarning(warning);
        return { success: false, message: warning };
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'An unexpected error occurred during login.';
      setAuthError(errMessage);
      return { success: false, message: errMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign out
  const signOutAdmin = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    setAuthWarning(null);
    setAuthError(null);
  };

  // Public Booking appointment creation
  // CRITICAL RULE:
  // "When creating an appointment, do not use .insert(...).select() or .insert(...).select().single()."
  // "Public users are allowed to insert appointments, but they are not allowed to read all appointments."
  // "Use insert only, then show the success screen from the local booking data already available in the form."
  // "Do not insert id manually. Do not insert created_at manually."
  // "service_id must be the selected service id from the services table."
  const createAppointment = async (apptData: {
    fullName: string;
    email: string;
    phone: string;
    serviceId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const payload = {
      full_name: apptData.fullName.trim(),
      email: apptData.email.trim(),
      phone: apptData.phone.trim(),
      service_id: apptData.serviceId,
      appointment_date: apptData.appointmentDate,
      start_time: apptData.startTime,
      end_time: apptData.endTime,
      status: 'pending' as const,
      notes: apptData.notes?.trim() || null,
    };

    if (isSupabaseConfigured) {
      try {
        // Pure insert, NO .select()
        const { error } = await supabase.from('appointments').insert([payload]);
        if (error) {
          console.error('Supabase appointment insert error:', error);
          return { success: false, error: error.message };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to submit appointment.';
        return { success: false, error: msg };
      }
    }

    // Keep local cache up to date for preview/admin responsiveness
    const syntheticAppt: Appointment = {
      id: 'local-' + Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
      services: services.find((s) => s.id === apptData.serviceId),
    };
    setAppointments((prev) => [syntheticAppt, ...prev]);

    return { success: true };
  };

  // Admin Management Actions:
  const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('appointments')
          .update({ status })
          .eq('id', id);
        if (error) {
          console.error('Error updating status in Supabase:', error);
          return false;
        }
      } catch (err) {
        console.error('Exception updating status:', err);
        return false;
      }
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    return true;
  };

  const addService = async (newService: Omit<Service, 'id' | 'created_at'>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('services')
          .insert([newService])
          .select()
          .single();
        if (error) {
          console.error('Error adding service to Supabase:', error);
          return false;
        }
        if (data) {
          setServices((prev) => [...prev, data]);
          return true;
        }
      } catch (err) {
        console.error('Exception adding service:', err);
        return false;
      }
    }

    const localService: Service = {
      ...newService,
      id: 'srv-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setServices((prev) => [...prev, localService]);
    return true;
  };

  const updateService = async (id: string, updates: Partial<Service>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('services')
          .update(updates)
          .eq('id', id);
        if (error) {
          console.error('Error updating service in Supabase:', error);
          return false;
        }
      } catch (err) {
        console.error('Exception updating service:', err);
        return false;
      }
    }

    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    return true;
  };

  const toggleServiceActive = async (id: string, isActive: boolean): Promise<boolean> => {
    return updateService(id, { is_active: isActive });
  };

  const updateBusinessHours = async (hours: BusinessHours[]): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        for (const item of hours) {
          const { error } = await supabase
            .from('business_hours')
            .upsert(
              {
                weekday: item.weekday,
                is_open: item.is_open,
                start_time: item.start_time,
                end_time: item.end_time,
              },
              { onConflict: 'weekday' }
            );
          if (error) {
            console.error('Error updating hours:', error);
          }
        }
      } catch (err) {
        console.error('Exception updating business hours:', err);
        return false;
      }
    }
    setBusinessHours(hours);
    return true;
  };

  const addBlockedDate = async (date: string, reason: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('blocked_dates')
          .insert([{ blocked_date: date, reason }])
          .select()
          .single();
        if (error) {
          console.error('Error adding blocked date:', error);
          return false;
        }
        if (data) {
          setBlockedDates((prev) => [...prev, data]);
          return true;
        }
      } catch (err) {
        console.error('Exception adding blocked date:', err);
        return false;
      }
    }

    const localBlocked: BlockedDate = {
      id: 'bd-' + Date.now(),
      blocked_date: date,
      reason,
      created_at: new Date().toISOString(),
    };
    setBlockedDates((prev) => [...prev, localBlocked]);
    return true;
  };

  const removeBlockedDate = async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('blocked_dates')
          .delete()
          .eq('id', id);
        if (error) {
          console.error('Error deleting blocked date:', error);
          return false;
        }
      } catch (err) {
        console.error('Exception removing blocked date:', err);
        return false;
      }
    }
    setBlockedDates((prev) => prev.filter((b) => b.id !== id));
    return true;
  };

  const updateBusinessSettings = async (updates: Partial<BusinessSettings>): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('business_settings')
          .update(updates)
          .eq('id', businessSettings.id);
        if (error) {
          console.error('Error updating business settings:', error);
          return false;
        }
      } catch (err) {
        console.error('Exception updating business settings:', err);
        return false;
      }
    }
    setBusinessSettings((prev) => ({ ...prev, ...updates }));
    return true;
  };

  // Helper for admin to seed initial tables into Supabase if empty
  const seedInitialDataToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.' };
    }
    try {
      // 1. Insert settings
      await supabase.from('business_settings').upsert({
        business_name: 'Yarpyae Beauty Salon',
        business_email: 'hello@yarpyaebeautysalon.com',
        business_phone: '+95 9 789 223 344',
        business_address: 'No 44, Yadanagu Pagoda Road, Amarapura',
        slot_interval_minutes: 30,
        booking_notice_hours: 2,
      });

      // 2. Insert hours
      for (const h of DEFAULT_BUSINESS_HOURS) {
        await supabase.from('business_hours').upsert(
          { weekday: h.weekday, is_open: h.is_open, start_time: h.start_time, end_time: h.end_time },
          { onConflict: 'weekday' }
        );
      }

      // 3. Insert services
      for (const s of DEFAULT_SERVICES) {
        await supabase.from('services').upsert({
          name: s.name,
          description: s.description,
          duration_minutes: s.duration_minutes,
          price: s.price,
          is_active: true,
        });
      }

      await loadPublicData();
      return { success: true, message: 'Default salon data successfully seeded to your Supabase project!' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to seed data';
      return { success: false, message: msg };
    }
  };

  const activeServices = services.filter((s) => s.is_active);

  return (
    <SalonContext.Provider
      value={{
        isConfigured: isSupabaseConfigured,
        services,
        activeServices,
        businessSettings,
        businessHours,
        blockedDates,
        appointments,
        loadingInitialData,
        loadingAppointments,
        session,
        user,
        isAdmin,
        authLoading,
        authError,
        authWarning,
        signInAdmin,
        signOutAdmin,
        createAppointment,
        refreshAppointments,
        updateAppointmentStatus,
        addService,
        updateService,
        toggleServiceActive,
        updateBusinessHours,
        addBlockedDate,
        removeBlockedDate,
        updateBusinessSettings,
        seedInitialDataToSupabase,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
