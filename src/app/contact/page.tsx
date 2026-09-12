'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useClinicSettings } from '@/context/ClinicSettingsContext';

export default function ContactPage() {
  const { settings } = useClinicSettings();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: 'appointment',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        inquiryType: 'appointment',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* Top Introduction Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>فريق الرعاية بانتظار استفسارك</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-heading">
            نسعد بتواصلكم والإجابة عن تساؤلاتكم
          </h1>
          <p className="text-sm text-body leading-relaxed">
            نولي وقتكم وصحتكم أقصى عناية. فريق الاستقبال الطبي في عيادة ماستر هيلث مستعد لتقديم كافة الإيضاحات وتسهيل رحلتكم العلاجية بكل راحة ويسر.
          </p>
        </div>

        {/* Real-Time Clinic Status Badge */}
        <div className="bg-white border border-border p-4 rounded-2xl shadow-card flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">clinical_notes</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-heading">العيادة تستقبل المراجعين الآن</span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </div>
            <span className="text-[11px] text-muted">الدوام مستمر اليوم حتى 09:00 مساءً</span>
          </div>
        </div>
      </div>

      {/* Quick Communication Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Card: Phone */}
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="group bg-white border border-border p-6 rounded-2xl shadow-card hover:shadow-hover transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted font-medium">الاتصال الهاتفي المباشر</span>
            <span className="text-base font-bold text-heading group-hover:text-primary transition-colors" dir="ltr">
              {settings.phone}
            </span>
            <span className="text-xs text-body">الاستفسارات وحجوزات المواعيد</span>
          </div>
        </a>

        {/* Card: WhatsApp */}
        <a
          href={`https://wa.me/${settings.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white border border-border p-6 rounded-2xl shadow-card hover:shadow-hover transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary/15 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted font-medium">واتساب خدمة المراجعين</span>
            <span className="text-base font-bold text-heading group-hover:text-secondary transition-colors" dir="ltr">
              {settings.phone}
            </span>
            <span className="text-xs text-body">رد فوري خلال أوقات الدوام الرسمي</span>
          </div>
        </a>

        {/* Card: Email */}
        <a
          href={`mailto:${settings.email}`}
          className="group bg-white border border-border p-6 rounded-2xl shadow-card hover:shadow-hover transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <span className="material-symbols-outlined text-2xl">mail</span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-xs text-muted font-medium">البريد الإلكتروني المخصص</span>
            <span className="text-base font-bold text-heading group-hover:text-primary transition-colors truncate">
              {settings.email}
            </span>
            <span className="text-xs text-body">التقارير الطبية والمراسلات</span>
          </div>
        </a>

      </div>

      {/* Main Content Grid: Form (7 cols) & Details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white border border-border p-6 sm:p-8 rounded-2xl shadow-card flex flex-col gap-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-xl font-bold text-heading">إرسال استفسار أو طلب تواصل</h2>
            <p className="text-xs sm:text-sm text-body mt-1">
              يرجى تعبئة النموذج أدناه وسيتم التواصل معكم من قبل المشرف الإكلينيكي في أقرب وقت.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  الاسم بالكامل <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="مثال: د. عبد العزيز السالم"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  رقم الجوال <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05X XXX XXXX"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm text-right focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  البريد الإلكتروني (اختياري)
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  موضوع الاستفسار <span className="text-error">*</span>
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="appointment">استفسار عن موعد مسبق</option>
                  <option value="doctor">استشارة بخصوص تخصص أو طبيب</option>
                  <option value="insurance">التأمين والخدمات المغطاة</option>
                  <option value="medical_report">طلب تقرير أو نتائج فحص</option>
                  <option value="other">ملاحظات واقتراحات أخرى</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-heading mb-1">
                نص الرسالة أو الملاحظة <span className="text-error">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب استفسارك هنا بكل وضوح..."
                className="w-full p-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>تم استلام استفساركم بنجاح. سيقوم فريق العيادة بالتواصل معكم عبر رقم الجوال المسجل.</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-muted flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">verified</span>
                <span>بياناتك مشفرة ومحمية وفق معايير الخصوصية الصحية</span>
              </span>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-7 py-3 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>{submitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Location & Clinical Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Address & Working Schedule */}
          <div className="bg-white border border-border p-6 rounded-2xl shadow-card flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">apartment</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-bold text-heading">مقر وعنوان العيادة</span>
                <p className="text-xs text-body leading-relaxed">
                  {settings.address}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Clinic Hours Breakdown */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-heading flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
                <span>أوقات ومواعيد العمل واستقبال المراجعين</span>
              </span>
              <div className="p-3.5 rounded-xl bg-background border border-border text-xs text-body leading-relaxed whitespace-pre-line">
                {settings.working_hours}
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Parking & Accessibility Notes */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-heading flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">local_parking</span>
                <span>مواقف السيارات وتسهيلات الوصول</span>
              </span>
              <ul className="space-y-1.5 text-xs text-body pt-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>مواقف مجانية مظللة خاصة بمراجعي العيادة (طابق B1 و B2).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>مداخل مجهزة ومنحدرات مخصصة للكراسي المتحركة ومصاعد واسعة.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>خدمة إيقاف السيارات (Valet) متاحة عند المدخل الرئيسي للبرج.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Map Presentation */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">distance</span>
                <span className="text-xs font-bold text-heading">موقع العيادة على الخريطة</span>
              </div>
              <a
                href="https://maps.google.com/?q=King+Abdulaziz+Road+Riyadh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-background border border-border text-primary px-3 py-1 rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors"
              >
                <span>فتح في خرائط Google</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

            {/* Styled Map Container */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-primary/10 border border-border flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
              
              {/* Map Pin Overlay */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md shadow-md px-4 py-2 rounded-xl flex items-center gap-2 border border-border">
                <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary">Master Health Clinic</span>
                  <span className="text-[10px] text-muted">عيادة 402 - برج النخبة</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">directions_car</span>
                <span>10 دقائق من طريق الملك فهد</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">directions_walk</span>
                <span>دقيقتان من محطة الحافلات</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Supplementary Care Assurance Banner */}
      <div className="mt-12 bg-white border border-border p-6 rounded-2xl shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-xl">medical_services</span>
          </div>
          <div>
            <span className="text-sm font-bold text-heading">هل تحتاج إلى استشارة طبية عاجلة؟</span>
            <p className="text-xs text-muted">
              يمكنك حجز موعد مباشر وفوري مع الاستشاري دون انتظار من خلال منصتنا الإلكترونية.
            </p>
          </div>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors shrink-0"
        >
          <span>حجز موعد طبي الآن</span>
          <span className="material-symbols-outlined text-sm">calendar_today</span>
        </Link>
      </div>

    </div>
  );
}
