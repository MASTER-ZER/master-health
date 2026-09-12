'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClinicSettings } from '@/context/ClinicSettingsContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useClinicSettings();

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide public navbar on all admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'الرئيسية', href: '/', icon: 'home' },
    { name: 'عن العيادة', href: '/about', icon: 'stethoscope' },
    { name: 'احجز موعد', href: '/book', icon: 'calendar_month' },
    { name: 'تواصل معنا', href: '/contact', icon: 'mail' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7FAFC]/95 backdrop-blur-md border-b border-border/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Clinic Identity */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 sm:gap-3 group select-none min-w-0"
            aria-label="الرئيسية - عيادة ماستر الطبية"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ color: '#2B6CB0' }}>
                local_hospital
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-extrabold text-primary tracking-tight leading-tight truncate">
                Master Health
              </span>
              <span className="text-[10px] sm:text-xs text-muted font-medium truncate">
                عيادة ماستر الطبية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/80 p-1.5 rounded-xl border border-border/70">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 lg:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-body hover:text-heading hover:bg-surface-muted'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Contact and Booking CTA */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-xs xl:text-sm text-body hover:text-primary font-bold transition-colors"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-primary text-base">call</span>
              <span>{settings.phone}</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary-hover text-white px-4 xl:px-5 py-2.5 rounded-xl text-sm font-bold shadow-xs hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>احجز موعدك الآن</span>
            </Link>
          </div>

          {/* Mobile Actions (Visible on screens < 768px) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {/* Direct Booking CTA on Mobile Navbar - Always accessible */}
            <Link
              href="/book"
              className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>احجز موعد</span>
            </Link>

            {/* Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-border/80 text-heading hover:bg-surface-muted active:scale-95 shadow-2xs transition-all"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-2xl transition-transform duration-200">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation with Slide Down Animation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/80 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-heading hover:bg-surface-muted active:bg-surface-muted'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-lg ${active ? 'text-white' : 'text-primary'}`}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </div>
                  {active ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <span className="material-symbols-outlined text-sm text-muted">arrow_back_ios</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Direct Actions in Mobile Drawer */}
          <div className="mt-4 pt-4 border-t border-border/70 flex flex-col gap-2.5">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs sm:text-sm text-primary font-bold bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-xl transition-colors"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>{settings.phone}</span>
            </a>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs sm:text-sm text-white font-bold bg-secondary hover:bg-secondary-hover rounded-xl shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">event_available</span>
              <span>تأكيد حجز استشارة طبية</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
