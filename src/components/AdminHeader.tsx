'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    {
      name: 'الحجوزات والمواعيد',
      href: '/admin',
      icon: 'calendar_month',
      active: pathname === '/admin',
    },
    {
      name: 'إعدادات وبيانات العيادة',
      href: '/admin/settings',
      icon: 'tune',
      active: pathname === '/admin/settings',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Brand & Area Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl" style={{ color: '#2B6CB0' }}>
                admin_panel_settings
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-heading">لوحة تحكم عيادة ماستر هيلث</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  مباشر
                </span>
              </div>
              <p className="text-[11px] text-muted">نظام الإدارة الداخلية والطاقم الطبي</p>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/80 p-1 rounded-xl border border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  item.active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-body hover:text-heading hover:bg-surface-muted'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* View Live Site button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-background hover:bg-surface-muted border border-border text-xs font-bold text-heading rounded-lg transition-all"
              title="معاينة الموقع العام في تبويب جديد"
            >
              <span className="material-symbols-outlined text-sm text-primary">open_in_new</span>
              <span className="hidden sm:inline">معاينة الموقع</span>
            </a>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-error/10 border border-border hover:border-error/30 text-xs font-bold text-error rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-border gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                item.active
                  ? 'bg-primary text-white'
                  : 'text-body hover:bg-surface-muted'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

      </div>
    </header>
  );
}
