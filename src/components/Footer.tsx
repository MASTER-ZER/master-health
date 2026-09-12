'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClinicSettings } from '@/context/ClinicSettingsContext';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useClinicSettings();

  // Hide the public footer completely on all admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Clinic Brand & Bio */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl" style={{ color: '#2B6CB0' }}>
                  local_hospital
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">Master Health</h3>
                <p className="text-xs text-muted">عيادة ماستر الطبية</p>
              </div>
            </div>
            <p className="text-sm text-body leading-relaxed line-clamp-4">
              {settings.about_text}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-heading text-primary">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-body">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  عن العيادة والطبيب
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-primary transition-colors">
                  احجز موعد كشف
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-heading text-primary">أوقات العمل</h4>
            <div className="space-y-1.5 text-xs sm:text-sm text-body leading-relaxed whitespace-pre-line bg-background p-3 rounded-xl border border-border">
              {settings.working_hours}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-heading text-primary">معلومات التواصل</h4>
            <div className="space-y-2 text-sm text-body">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">location_on</span>
                <span className="text-xs leading-relaxed">{settings.address}</span>
              </p>
              <p className="flex items-center gap-2" dir="ltr">
                <span className="material-symbols-outlined text-primary text-base">call</span>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                <a href={`mailto:${settings.email}`} className="hover:text-primary transition-colors">
                  {settings.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Master Health — جميع الحقوق محفوظة لعيادة ماستر الطبية.</p>
          <p className="text-[11px] text-muted">بإشراف {settings.doctor_name}</p>
        </div>
      </div>
    </footer>
  );
}
