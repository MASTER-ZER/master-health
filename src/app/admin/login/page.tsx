'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@masterhealth.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول');
      }

      // Successfully logged in
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تسجيل الدخول.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 bg-background relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Top Identity Area */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-3xl" style={{ color: '#2B6CB0' }}>
              admin_panel_settings
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            بوابة الإدارة والطاقم الطبي
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
            تسجيل دخول لوحة التحكم
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            إدارة حجوزات المراجعين ومتابعة جدول مواعيد العيادة
          </p>
        </div>

        {/* Login Container Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-card">
          
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-heading mb-1.5" htmlFor="email">
                البريد المهني للإدارة
              </label>
              <div className="relative flex items-center">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@masterhealth.com"
                  className="w-full h-12 pr-11 pl-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  dir="ltr"
                />
                <span className="absolute right-3.5 text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-xl">badge</span>
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-heading mb-1.5" htmlFor="password">
                كلمة المرور
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 pr-11 pl-11 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all tracking-wider"
                  dir="ltr"
                />
                <span className="absolute right-3.5 text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 text-muted hover:text-heading p-1 transition-colors"
                  aria-label="إظهار كلمة المرور"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Demo Helper Box */}
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-body space-y-1">
              <span className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">key</span>
                <span>بيانات دخول الديمو الافتراضية:</span>
              </span>
              <div className="flex justify-between text-[11px] text-muted pt-0.5">
                <span>البريد: <b className="text-heading font-mono">admin@masterhealth.com</b></span>
                <span>كلمة السر: <b className="text-heading font-mono">admin123</b></span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري التحقق والدخول...</span>
                  </>
                ) : (
                  <>
                    <span>تسجيل الدخول للنظام</span>
                    <span className="material-symbols-outlined text-lg">login</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Back to Site */}
        <div className="text-center">
          <Link href="/" className="text-xs text-muted hover:text-primary transition-colors inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            <span>العودة للصفحة الرئيسية للعيادة</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
