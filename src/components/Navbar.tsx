'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClinicSettings } from '@/context/ClinicSettingsContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useClinicSettings();

  // Hide the public navbar completely on all admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'عن العيادة', href: '/about' },
    { name: 'احجز موعد', href: '/book' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7FAFC]/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl" style={{ color: '#2B6CB0' }}>
                local_hospital
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary tracking-tight">
                Master Health
              </span>
              <span className="text-xs text-muted font-medium">
                عيادة ماستر الطبية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/80 p-1.5 rounded-xl border border-border">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-body hover:text-heading hover:bg-surface-muted'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Contact and Booking CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-sm text-body hover:text-primary font-medium transition-colors"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-primary text-base">call</span>
              <span>{settings.phone}</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-150"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>احجز موعدك الآن</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/book"
              className="bg-secondary text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm"
            >
              احجز موعد
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-body hover:text-heading hover:bg-surface border border-border"
              aria-label="القائمة الرئيسية"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-body hover:bg-surface-muted'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-2 text-sm text-primary font-bold bg-primary/5 rounded-lg"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
