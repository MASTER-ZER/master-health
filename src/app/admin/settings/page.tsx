'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import { useClinicSettings } from '@/context/ClinicSettingsContext';
import { ClinicSettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { settings, updateSettings, refreshSettings } = useClinicSettings();

  // Local form state
  const [formData, setFormData] = useState<ClinicSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Protect client side
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          router.replace('/admin/login');
        }
      } catch (e) {
        router.replace('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  // Sync initial settings into form
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    const res = await updateSettings(formData);
    setSaving(false);

    if (res.success) {
      setSuccessMessage('تم حفظ وتحديث بيانات العيادة بنجاح في قاعدة بيانات Supabase!');
      await refreshSettings();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(res.error || 'حدث خطأ أثناء حفظ الإعدادات.');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      
      {/* Dedicated Admin Header */}
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Page Banner */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">settings</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-heading">إعدادات وبيانات العيادة</h1>
              <p className="text-xs text-muted mt-0.5">
                تعديل معلومات الطبيب، أرقام التواصل، العنوان، وساعات العمل لتنعكس فورياً على كافة صفحات الموقع العام
              </p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>معاينة الموقع العام</span>
          </a>
        </div>

        {/* Feedback Notifications */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-xl shrink-0">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-error/15 border border-error/30 text-error text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-xl shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8 bg-white border border-border p-6 sm:p-8 rounded-2xl shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Doctor Name & Specialty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-base">person</span>
                    <span>اسم الطبيب / الاستشاري</span>
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="doctor_name"
                    value={formData.doctor_name || ''}
                    onChange={handleChange}
                    placeholder="مثال: د. خالد المنصوري"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-base">medical_services</span>
                    <span>التخصص والمسمى المهني</span>
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="specialty"
                    value={formData.specialty || ''}
                    onChange={handleChange}
                    placeholder="مثال: استشاري أمراض القلب والباطنية"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Contact Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-base">call</span>
                    <span>رقم الهاتف الظاهر في الموقع</span>
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    placeholder="+966 11 482 9900"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm text-left focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-base">mail</span>
                    <span>البريد الإلكتروني للعيادة</span>
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="contact@masterhealth.com"
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm text-left focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">location_on</span>
                  <span>عنوان ومقر العيادة</span>
                  <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder="مثال: برج النخبة الطبي، طريق الملك فهد، الرياض، المملكة العربية السعودية"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">schedule</span>
                  <span>مواعيد وساعات العمل</span>
                  <span className="text-error">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  name="working_hours"
                  value={formData.working_hours || ''}
                  onChange={handleChange}
                  placeholder="مثال: السبت - الأربعاء: 04:00 م - 09:00 م | الخميس: 04:00 م - 08:00 م | الجمعة: مغلق"
                  className="w-full p-3.5 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <span className="text-[11px] text-muted block mt-1">
                  يمكن كتابة الأوقات كنص حر ومفصل أو أسطر متعددة.
                </span>
              </div>

              {/* About Clinic Text */}
              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">description</span>
                  <span>النبذة التعريفية (عن العيادة والطبيب)</span>
                  <span className="text-error">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  name="about_text"
                  value={formData.about_text || ''}
                  onChange={handleChange}
                  placeholder="النبذة المختصرة التي تظهر في الصفحة الرئيسية وصفحة عن العيادة..."
                  className="w-full p-3.5 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary-hover text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري حفظ التعديلات في Supabase...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">save</span>
                      <span>حفظ التعديلات فورياً</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(settings)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-muted hover:text-heading transition-colors"
                >
                  إلغاء التغييرات غير المحفوظة
                </button>
              </div>

            </form>
          </div>

          {/* Right Live Preview Card (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-border p-6 rounded-2xl shadow-card sticky top-24">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <span className="material-symbols-outlined text-primary text-xl">preview</span>
                <div>
                  <h3 className="text-xs font-bold text-heading">معاينة حية فورية</h3>
                  <p className="text-[10px] text-muted">هكذا ستظهر بياناتك للمرضى في الموقع العام</p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                {/* Doctor profile card */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <span className="text-[10px] text-primary font-bold block mb-1">الطبيب المعالج</span>
                  <div className="font-bold text-sm text-heading">{formData.doctor_name || '—'}</div>
                  <div className="text-muted text-[11px] mt-0.5">{formData.specialty || '—'}</div>
                </div>

                {/* Phone */}
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted">رقم التواصل:</span>
                  <span className="font-bold text-primary font-mono" dir="ltr">{formData.phone || '—'}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted">البريد:</span>
                  <span className="font-bold text-heading font-mono text-[11px]" dir="ltr">{formData.email || '—'}</span>
                </div>

                {/* Address */}
                <div className="py-2 border-b border-border">
                  <span className="text-muted block mb-1">العنوان:</span>
                  <span className="font-medium text-heading text-[11px] leading-relaxed block">
                    {formData.address || '—'}
                  </span>
                </div>

                {/* Working hours */}
                <div className="py-2 border-b border-border">
                  <span className="text-muted block mb-1">ساعات العمل:</span>
                  <span className="font-medium text-heading text-[11px] leading-relaxed block whitespace-pre-line">
                    {formData.working_hours || '—'}
                  </span>
                </div>

                {/* Note */}
                <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/15 text-[11px] text-muted leading-relaxed">
                  💡 عند الضغط على <b>حفظ التعديلات</b>، يتم تحديث جدول <code>clinic_settings</code> في Supabase فوراً، وتنعكس التغييرات تلقائياً في الواجهة العامة بدون أي إعادة نشر.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
