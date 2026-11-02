import React, { useState, useEffect } from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { ServicesSection } from './components/public/ServicesSection';
import { AboutSection } from './components/public/AboutSection';
import { BookingSection } from './components/public/BookingSection';
import { Footer } from './components/public/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { Service } from './types';

const MainAppContent: React.FC = () => {
  const { isAdmin, authLoading } = useSalon();
  const { t } = useLanguage();

  // Route state: 'public' or 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);

  // Sync hash routing: #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '#public' || window.location.hash === '') {
        setCurrentView('public');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setCurrentView('public');
  };

  const handleSelectServiceToBook = (service: Service) => {
    setPreselectedService(service);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in admin view:
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full border-3 border-[#D9A592] border-t-transparent animate-spin mb-4" />
          <h3 className="font-serif text-lg text-[#241F1C]">Verifying Salon Permissions</h3>
          <p className="text-xs text-[#726861] mt-1">Connecting to Supabase Auth & admin registry...</p>
        </div>
      );
    }

    if (isAdmin) {
      return <AdminLayout onBackToWebsite={navigateToPublic} />;
    }

    return <AdminLogin onBackToWebsite={navigateToPublic} />;
  }

  // Otherwise, Public Salon Experience
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#241F1C] flex flex-col selection:bg-[#E8D4C8] selection:text-[#3B2C24]">
      {/* Refined Navigation Bar with Language Switcher */}
      <Navbar onOpenAdmin={navigateToAdmin} onBookClick={handleBookClick} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onBookClick={handleBookClick} />

        {/* Dynamic Services Menu with Photography */}
        <ServicesSection onSelectServiceToBook={handleSelectServiceToBook} />

        {/* Our Sanctuary & Brand Story */}
        <AboutSection />

        {/* The Glow Experience Pillar Section */}
        <section id="experience" className="py-20 bg-[#F5EFEB] border-t border-[#EAE3DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
              <p className="text-xs uppercase tracking-widest text-[#9E6D59] font-medium">
                {t.experience.kicker}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1C] tracking-tight">
                {t.experience.headline}
              </h2>
              <p className="text-sm text-[#726861]">
                {t.experience.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-[#E8DFD7] shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <span className="font-serif text-3xl text-[#D9A592] font-semibold">01</span>
                <h3 className="font-serif text-xl font-medium text-[#241F1C]">
                  {t.experience.step1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E635C] leading-relaxed">
                  {t.experience.step1Desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-[#E8DFD7] shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <span className="font-serif text-3xl text-[#D9A592] font-semibold">02</span>
                <h3 className="font-serif text-xl font-medium text-[#241F1C]">
                  {t.experience.step2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E635C] leading-relaxed">
                  {t.experience.step2Desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-[#E8DFD7] shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <span className="font-serif text-3xl text-[#D9A592] font-semibold">03</span>
                <h3 className="font-serif text-xl font-medium text-[#241F1C]">
                  {t.experience.step3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E635C] leading-relaxed">
                  {t.experience.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Booking System */}
        <BookingSection preselectedService={preselectedService} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={navigateToAdmin} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <SalonProvider>
        <MainAppContent />
      </SalonProvider>
    </LanguageProvider>
  );
}
