'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClinicSettings } from '@/context/ClinicSettingsContext';

export default function HomePage() {
  const { settings } = useClinicSettings();
  const [selectedSlot, setSelectedSlot] = useState('05:30 مساءً');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [quickForm, setQuickForm] = useState({
    fullName: '',
    phone: '',
    service: 'heart-check',
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.fullName || !quickForm.phone) return;
    setBookingSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Top Decorative Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          1. Hero Section
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Doctor Card Presentation Column (Order 1 on mobile, Order 2 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white border border-border/70 p-3 sm:p-4 rounded-2xl shadow-card">
              
              {/* Physician Image Frame */}
              <div className="relative w-full aspect-4/3 sm:aspect-square rounded-xl overflow-hidden bg-primary/5">
                <Image
                  src="/images/doctor.png"
                  alt={settings.doctor_name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Doctor Credential Chip inside Photo */}
                <div className="absolute bottom-2.5 right-2.5 left-2.5 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-primary text-base sm:text-lg shrink-0">medical_services</span>
                      <span className="text-xs sm:text-sm font-bold text-heading truncate">{settings.doctor_name}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full shrink-0">
                      متاح للحجز
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Trust Markers */}
              <div className="mt-3 flex items-center justify-between gap-2 bg-background p-2.5 sm:p-3.5 rounded-xl border border-border/70">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg sm:text-xl">workspace_premium</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-heading truncate">{settings.specialty}</span>
                    <span className="text-[10px] sm:text-[11px] text-muted truncate">اعتماد وتصنيف استشاري أول</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-border/70 text-xs font-bold text-warning-dark shrink-0">
                  <span className="material-symbols-outlined text-sm text-warning" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>4.9</span>
                </div>
              </div>

            </div>
          </div>

          {/* Text & Action Column (Order 2 on mobile, Order 1 on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border/80 shadow-2xs text-xs font-semibold text-primary max-w-full">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              <span className="shrink-0">عيادة استشارية معتمدة</span>
              <span className="text-border shrink-0">|</span>
              <span className="text-body font-normal truncate">{settings.address.split('،')[1] || settings.address.split('،')[0] || 'الرياض'}</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-heading tracking-tight leading-[1.3] sm:leading-[1.25]">
                رعايتكم الصحية أولويتنا.. <br />
                <span className="text-primary font-bold">طب متقدم وعناية شخصية فائقة</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base pt-0.5">
                <span className="font-bold text-primary text-base sm:text-lg">{settings.doctor_name}</span>
                <span className="text-border">|</span>
                <span className="text-body text-xs sm:text-sm">{settings.specialty}</span>
              </div>

              <p className="text-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-1">
                أكثر من 15 عاماً من الخبرة السريرية في تقديم أعلى معايير التشخيص والعلاج الطبي المتقدم في بيئة يسودها الاهتمام الدقيق والراحة والاطمئنان.
              </p>
            </div>

            {/* CTAs with touch-friendly heights and mobile vertical stack */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md active:scale-[0.98] transition-all group"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>احجز موعدك الآن</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              </Link>
              <a
                href="#services-section"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-muted text-heading border border-border px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-[0.98]"
              >
                <span>تعرف على التخصصات</span>
                <span className="material-symbols-outlined text-base text-primary">keyboard_arrow_down</span>
              </a>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 w-full">
              <div className="flex items-center gap-2.5 bg-white border border-border/70 p-3 rounded-xl shadow-card">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-heading truncate">اعتماد SCFHS</span>
                  <span className="text-[10px] sm:text-[11px] text-muted truncate">استشاري مرخص</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white border border-border/70 p-3 rounded-xl shadow-card">
                <span className="material-symbols-outlined text-warning text-xl sm:text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-heading truncate">4.9 / 5.0</span>
                  <span className="text-[10px] sm:text-[11px] text-muted truncate">1,200+ مراجع</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white border border-border/70 p-3 rounded-xl shadow-card col-span-2 sm:col-span-1">
                <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  health_and_safety
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-heading truncate">رعاية دقيقة</span>
                  <span className="text-[10px] sm:text-[11px] text-muted truncate">بروتوكولات حديثة</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. Highlights & Philosophy Snapshot
      ========================================================================= */}
      <section className="w-full bg-surface-muted border-y border-border py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Clinical Philosophy Overview */}
            <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>النهج الطبي والخبرة السريرية</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-bold text-heading leading-snug">
                رعاية تتمحور حول المريض، قائمة على الاستماع والتشخيص الدقيق
              </h2>

              <p className="text-body text-xs sm:text-base leading-relaxed">
                {settings.about_text}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-border/80 shadow-2xs">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0">check_circle</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-heading block">وقت مخصص وكافٍ</span>
                    <span className="text-[11px] sm:text-xs text-muted">استماع معمق وشرح مفصل للحالة</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-border/80 shadow-2xs">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0">biotech</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-heading block">أجهزة فحص دقيقة</span>
                    <span className="text-[11px] sm:text-xs text-muted">تخطيط هولتر وإجهاد متطور</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Stat Cards Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-border/80 shadow-card flex sm:flex-col justify-between items-center sm:items-start gap-4 sm:gap-0 sm:h-44">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">timeline</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary" dir="ltr">15+</div>
                  <p className="text-xs sm:text-sm font-bold text-heading mt-0.5 sm:mt-1">عاماً من الخبرة</p>
                  <p className="text-[11px] sm:text-xs text-muted">في كبرى المستشفيات المرجعية</p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-border/80 shadow-card flex sm:flex-col justify-between items-center sm:items-start gap-4 sm:gap-0 sm:h-44">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">how_to_reg</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-secondary" dir="ltr">12,000+</div>
                  <p className="text-xs sm:text-sm font-bold text-heading mt-0.5 sm:mt-1">استشارة ناجحة</p>
                  <p className="text-[11px] sm:text-xs text-muted">تشخيص وإدارة حالات قلبية</p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-border/80 shadow-card flex sm:flex-col justify-between items-center sm:items-start gap-4 sm:gap-0 sm:h-44">
                <div className="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center text-warning-dark shrink-0">
                  <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-warning-dark" dir="ltr">98%</div>
                  <p className="text-xs sm:text-sm font-bold text-heading mt-0.5 sm:mt-1">نسبة رضا المرضى</p>
                  <p className="text-[11px] sm:text-xs text-muted">استطلاعات الجودة المعتمدة</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. Medical Specialties & Services
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20" id="services-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-primary">التخصصات والخدمات المتقدمة</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-heading">
              خدمات سريرية شاملة لصحة قلبك وسلامتك العامة
            </h2>
          </div>
          <p className="text-sm text-body max-w-sm">
            نستخدم تقنيات تشخيصية غير جراحية تعتمد على الأدلة الإكلينيكية المعاصرة للوصول لأدق قراءة صحية ممكنة.
          </p>
        </div>

        {/* 4 Structured Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">cardiology</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  القلب والأوعية
                </span>
              </div>
              <h3 className="text-xl font-bold text-heading">
                الفحص الشامل للقلب والأوعية الدموية
              </h3>
              <p className="text-sm text-body leading-relaxed">
                تقييم فسيولوجي دقيق يشمل تخطيط القلب الكهربائي الرقمي (ECG)، مراقبة نبضات القلب المستمرة (هولتر 24/48 ساعة)، واختبار الجهد التداخلي لرصد تروية عضلة القلب واعتلال الصمامات مبكراً.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-bold text-secondary">فحص مباشر ومتابعة فورية</span>
              <Link
                href="/book"
                className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1"
              >
                <span>حجز الفحص</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">vital_signs</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  الأمراض المزمنة
                </span>
              </div>
              <h3 className="text-xl font-bold text-heading">
                استشارات الأمراض المزمنة وضبط الضغط والسكري
              </h3>
              <p className="text-sm text-body leading-relaxed">
                إدارة متكاملة وطويلة الأجل لارتفاع ضغط الدم الشرياني، اضطرابات دهون الدم والكوليسترول، ومضاعفات السكري على الشرايين عبر خطط علاجية وتغذوية متوازنة تحافظ على صحة الأعضاء الحيوية.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-bold text-secondary">برنامج متابعة دورية</span>
              <Link
                href="/book"
                className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1"
              >
                <span>حجز استشارة</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  الطب الوقائي
                </span>
              </div>
              <h3 className="text-xl font-bold text-heading">
                الفحوصات الوقائية الدورية وبرامج نمط الحياة
              </h3>
              <p className="text-sm text-body leading-relaxed">
                قياس مؤشرات الخطر القلبي التراكمي وتحديد القابلية الجينية أو العائلية لأمراض القلب، مع وضع توصيات علاجية وسلوكية دقيقة لحماية كبار السن والرياضيين والمهنيين المعرضين للضغط العصبي.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-bold text-secondary">تقييم مبكر واستباقي</span>
              <Link
                href="/book"
                className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1"
              >
                <span>فحص وقائي</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">clinical_notes</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  الرأي الطبي الثاني
                </span>
              </div>
              <h3 className="text-xl font-bold text-heading">
                استشارات الرأي الثاني والتشخيص الإكلينيكي الدقيق
              </h3>
              <p className="text-sm text-body leading-relaxed">
                مراجعة شاملة لتقارير القسطرة، رنين القلب، ونتائج التحاليل للمرضى المقبلين على إجراءات علاجية أو تداخلية، لضمان اتخاذ القرار الطبي الأمثل الأكثر أماناً وصحة للمريض وعائلته.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-bold text-secondary">دراسة ملفات معمقة</span>
              <Link
                href="/book"
                className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1"
              >
                <span>طلب رأي ثانٍ</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. Clinic Working Hours & Fast Interactive Preview Widget
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16" id="booking-cta">
        <div className="bg-primary/5 border border-primary/15 rounded-3xl p-4 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Schedule Information Details */}
            <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>أوقات عمل العيادة والاستقبال</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-heading">
                نحن هنا لنعتني بك في الوقت المناسب لك
              </h2>
              <p className="text-body text-xs sm:text-base leading-relaxed">
                تسعى عيادة ماستر هيلث لتوفير مواعيد مرنة تضمن عدم انتظار المرضى وأخذ وقت الفحص المريح كاملاً.
              </p>

              {/* Hours Table List */}
              <div className="flex flex-col gap-2 bg-white p-3.5 sm:p-4 rounded-xl border border-border/80 shadow-card mt-2">
                <div className="flex items-center justify-between py-2 border-b border-border/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                    <span className="font-bold text-heading">السبت إلى الخميس:</span>
                  </div>
                  <span className="font-bold text-heading" dir="ltr">09:00 AM - 09:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-border shrink-0" />
                    <span className="text-muted">الجمعة:</span>
                  </div>
                  <span className="text-[11px] sm:text-xs bg-surface-muted px-2.5 py-1 rounded-full text-muted font-medium">
                    مغلق (عطلة أسبوعية)
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
                    <span className="font-bold text-primary">طوارئ الحالات القلبية:</span>
                  </div>
                  <span className="font-bold text-primary text-[11px] sm:text-xs">استجابة هاتفية وتوجيه 24/7</span>
                </div>
              </div>
            </div>

            {/* Quick Booking Preview Widget */}
            <div className="lg:col-span-6 bg-white p-4 sm:p-8 rounded-2xl border border-border/80 shadow-card">
              {!bookingSubmitted ? (
                <form onSubmit={handleQuickSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                  <div className="flex items-center justify-between pb-1 sm:pb-2">
                    <div>
                      <h3 className="font-bold text-heading text-base sm:text-lg">حجز موعد كشف أو استشارة</h3>
                      <p className="text-[11px] sm:text-xs text-muted">خطوة واحدة بسيطة لتأكيد حجزك</p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-lg sm:text-xl">event_available</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-heading mb-1">اسم المريض الكامل</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: عبدالله بن فهد الشمري"
                      value={quickForm.fullName}
                      onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                      className="w-full h-11 px-3.5 bg-background rounded-xl text-xs sm:text-sm text-heading border border-border/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-heading mb-1">رقم الجوال</label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="05XXXXXXXX"
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        className="w-full h-11 px-3.5 bg-background rounded-xl text-xs sm:text-sm text-heading border border-border/80 text-right focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-heading mb-1">نوع الاستشارة</label>
                      <select
                        value={quickForm.service}
                        onChange={(e) => setQuickForm({ ...quickForm, service: e.target.value })}
                        className="w-full h-11 px-3 bg-background rounded-xl text-xs sm:text-sm text-heading border border-border/80 focus:bg-white focus:outline-none"
                      >
                        <option value="heart-check">فحص شامل للقلب</option>
                        <option value="chronic-care">متابعة ضغط وسكر</option>
                        <option value="second-opinion">رأي طبي ثانٍ</option>
                        <option value="preventive">فحص وقائي عام</option>
                      </select>
                    </div>
                  </div>

                  {/* Available Time Slots Preview */}
                  <div className="pt-1">
                    <label className="block text-xs text-muted mb-1.5 font-medium">الفترات المتاحة لهذا اليوم</label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {['10:00 صباحاً', '05:30 مساءً', '07:45 مساءً'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs font-bold transition-all truncate ${
                            selectedSlot === slot
                              ? 'bg-primary text-white shadow-xs'
                              : 'bg-background hover:bg-primary/10 text-body border border-border/60'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/book"
                      className="w-full h-12 bg-secondary hover:bg-secondary-hover text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      <span>الانتقال لصفحة الحجز الكاملة</span>
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">task_alt</span>
                  </div>
                  <h4 className="text-lg font-bold text-heading">تم استلام طلب موعدك بنجاح!</h4>
                  <p className="text-xs text-muted max-w-xs leading-relaxed">
                    سيقوم فريق الاستقبال بالتواصل معك هاتفياً أو عبر واتساب لتأكيد تفاصيل الزيارة.
                  </p>
                  <button
                    onClick={() => setBookingSubmitted(false)}
                    className="text-xs text-primary font-bold hover:underline mt-2"
                  >
                    حجز موعد آخر
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. Location & Reassurance Banner
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">pin_drop</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-heading">موقع ومقر العيادة</span>
              <span className="text-xs sm:text-sm text-body">
                {settings.address} — مواقف سيارات خاصة ومجهزة لراحة المراجعين
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-background hover:bg-surface-muted border border-border px-5 py-2.5 rounded-xl text-primary font-bold text-sm shadow-sm transition-colors"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
