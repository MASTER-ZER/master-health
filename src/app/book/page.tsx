'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface BookingResult {
  id: string;
  patient_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  note?: string;
  created_at?: string;
}

export default function BookAppointmentPage() {
  // Get today's date in YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  // Quick dates (Today, Tomorrow, Day after tomorrow)
  const quickDates = useMemo(() => {
    const dates = [];
    const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    for (let i = 0; i < 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'اليوم' : i === 1 ? 'غداً' : arabicDays[d.getDay()];
      const dateLabel = `${d.getDate()} ${arabicMonths[d.getMonth()]}`;
      dates.push({ iso, dayName, dateLabel, fullDay: arabicDays[d.getDay()] });
    }
    return dates;
  }, []);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(quickDates[1]?.iso || todayStr);
  const [preferredTime, setPreferredTime] = useState('05:30 مساءً');
  const [note, setNote] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Time Slots
  const morningSlots = ['10:00 صباحاً', '11:30 صباحاً', '12:45 ظهراً'];
  const eveningSlots = ['04:30 مساءً', '05:30 مساءً', '06:30 مساءً', '07:45 مساءً', '08:45 مساءً'];

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    if (!patientName.trim() || patientName.trim().length < 3) {
      setErrorMessage('يرجى إدخال اسم المريض الثلاثي بشكل صحيح (3 أحرف على الأقل).');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^((\+?966|0)?5\d{8}|(\+?20|0)?1[0125]\d{8}|\+?[1-9]\d{7,14})$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setErrorMessage('يرجى إدخال رقم هاتف صحيح للتواصل (مثال: 05xxxxxxxx أو +966...)');
      return;
    }

    if (!preferredDate || preferredDate < todayStr) {
      setErrorMessage('يرجى اختيار تاريخ صالح (لا يمكن حجز موعد في تاريخ سابق لليوم).');
      return;
    }

    if (!preferredTime) {
      setErrorMessage('يرجى اختيار الفترة أو الوقت المفضل للزيارة.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: patientName,
          phone: cleanPhone,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل في حفظ الحجز');
      }

      if (!data.booking || !data.booking.id) {
        throw new Error(data.error || 'حدث خطأ أثناء حفظ الحجز، برجاء المحاولة لاحقًا أو الاتصال بالعيادة مباشرة.');
      }

      setConfirmedBooking(data.booking);

      // Scroll to top of confirmation card
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء إرسال الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const copyRef = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setPatientName('');
    setPhone('');
    setPreferredDate(quickDates[0]?.iso || todayStr);
    setPreferredTime('05:30 مساءً');
    setNote('');
    setErrorMessage('');
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-background py-10 lg:py-16">
      {/* Subtle Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span className="material-symbols-outlined text-sm">chevron_left</span>
          <span className="text-primary font-bold">احجز موعد كشف</span>
        </div>

        {/* Top Clinical Context Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 bg-white border border-border p-6 rounded-2xl shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">event_available</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-bold text-secondary">الحجوزات مفتوحة اليوم</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-heading mt-0.5">
                حجز موعد عيادة ماستر هيلث
              </h1>
              <p className="text-xs text-muted">
                خطوات سريعة لحجز استشارتك مع نخبة الكوادر الطبية المتخصصة بالرياض
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-border">
              <span className="material-symbols-outlined text-secondary text-lg">verified</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-heading">اعتماد صحي معتمد</span>
                <span className="text-[10px] text-muted">امتثال لمعايير وزارة الصحة</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-border">
              <span className="material-symbols-outlined text-primary text-lg">schedule</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-heading">تأكيد مباشر</span>
                <span className="text-[10px] text-muted">متابعة سريعة عبر الهاتف/واتساب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dynamic Booking Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-border p-6 sm:p-8 rounded-2xl shadow-card">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  ١
                </span>
                <span className="text-xs sm:text-sm font-bold text-heading">بيانات المريض</span>
              </div>
              <div className="h-0.5 w-8 sm:w-16 bg-border" />
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  ٢
                </span>
                <span className="text-xs sm:text-sm font-bold text-heading">الموعد والوقت</span>
              </div>
              <div className="h-0.5 w-8 sm:w-16 bg-border" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  confirmedBooking ? 'bg-secondary text-white' : 'bg-background border border-border text-muted'
                }`}>
                  ٣
                </span>
                <span className={`text-xs sm:text-sm font-bold ${
                  confirmedBooking ? 'text-secondary' : 'text-muted'
                }`}>
                  التأكيد الفوري
                </span>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold flex items-start gap-2">
                <span className="material-symbols-outlined text-lg shrink-0">error</span>
                <div className="flex-1">
                  <p>{errorMessage}</p>
                  {errorMessage.includes('SQL Editor') && (
                    <p className="mt-1 text-[11px] text-body">
                      تلميح: افتح مشروع Supabase ➔ توجه إلى <b>SQL Editor</b> ➔ الصق محتوى ملف <code>supabase/schema.sql</code> واضغط <b>Run</b>.
                    </p>
                  )}
                </div>
              </div>
            )}

            {!confirmedBooking ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Field 1: Patient Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-heading mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">person</span>
                    <span>الاسم الكامل للمريض</span>
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="مثال: عبدالله بن عبدالعزيز السلمان"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <span className="text-[11px] text-muted block mt-1">
                    يرجى كتابة الاسم الثلاثي كما هو مسجل في الهوية الوطنية أو الإقامة.
                  </span>
                </div>

                {/* Field 2: Phone Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-heading mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">smartphone</span>
                    <span>رقم الجوال للتواصل والتأكيد</span>
                    <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05X XXX XXXX"
                      className="w-full h-12 pl-4 pr-24 rounded-xl bg-background border border-border text-heading text-sm text-left focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1 px-3 bg-white border border-border rounded-lg text-xs text-muted select-none" dir="ltr">
                      <span>🇸🇦</span>
                      <span className="font-bold text-heading">+966</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted block mt-1">
                    سنرسل تفاصيل الموعد عبر رسالة نصية أو واتساب لهذا الرقم.
                  </span>
                </div>

                {/* Field 3: Date Picker & Day Selector */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-heading mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
                    <span>تاريخ الموعد المفضل</span>
                    <span className="text-error">*</span>
                  </label>
                  
                  {/* Quick Select Day Pills */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {quickDates.map((q) => {
                      const isSelected = preferredDate === q.iso;
                      return (
                        <button
                          key={q.iso}
                          type="button"
                          onClick={() => setPreferredDate(q.iso)}
                          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary border-primary text-white shadow-sm'
                              : 'bg-background border-border hover:bg-primary/5 text-heading'
                          }`}
                        >
                          <span className={`text-[11px] font-medium ${isSelected ? 'text-primary-light' : 'text-muted'}`}>
                            {q.dayName}
                          </span>
                          <span className="text-xs sm:text-sm font-bold mt-0.5">
                            {q.dateLabel}
                          </span>
                          <span className={`text-[10px] font-bold mt-1 ${isSelected ? 'text-secondary-light' : 'text-secondary'}`}>
                            متاح للحجز
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Native Date Input */}
                  <input
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Field 4: Time Slot Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-heading flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-base">alarm</span>
                      <span>اختيار الفترة والوقت المفضل</span>
                      <span className="text-error">*</span>
                    </label>
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                      المحدد: {preferredTime}
                    </span>
                  </div>

                  {/* Morning Slots */}
                  <div className="mb-3">
                    <span className="text-xs text-muted font-medium mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-warning">wb_sunny</span>
                      <span>الفترة الصباحية (10:00 ص - 01:00 م)</span>
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {morningSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredTime(slot)}
                          className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                            preferredTime === slot
                              ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                              : 'bg-background hover:bg-surface-muted text-heading border border-border'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <span className="text-xs text-muted font-medium mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">nights_stay</span>
                      <span>الفترة المسائية (04:30 م - 09:00 م)</span>
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {eveningSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredTime(slot)}
                          className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                            preferredTime === slot
                              ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20'
                              : 'bg-background hover:bg-surface-muted text-heading border border-border'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 5: Notes */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-heading mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">description</span>
                    <span>ملاحظات إضافية أو سبب الاستشارة</span>
                    <span className="text-xs text-muted font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="أذكر باختصار الأعراض أو سبب الزيارة لمساعدة الفريق الطبي في تجهيز ملفك مسبقاً..."
                    className="w-full p-4 rounded-xl bg-background border border-border text-heading text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Privacy Guarantee Banner */}
                <div className="bg-primary/5 border border-primary/15 p-4 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">lock</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-heading">سرية وأمان البيانات الطبية</span>
                    <span className="text-[11px] text-muted leading-relaxed">
                      تخضع جميع سجلات المرضى وبيانات الاتصال لأعلى معايير التشفير والسرية الطبية المعتمدة.
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-13 bg-secondary hover:bg-secondary-hover text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>جاري حفظ الحجز في النظام...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                      <span>تأكيد حجز الموعد</span>
                    </>
                  )}
                </button>

              </form>
            ) : (
              /* Success Screen inside the form container */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto shadow-sm">
                  <span className="material-symbols-outlined text-4xl">task_alt</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-heading">
                    تم استلام طلب حجز موعدك بنجاح!
                  </h2>
                  <p className="text-sm text-muted mt-2 max-w-md mx-auto">
                    شكراً لاختيارك عيادة ماستر هيلث. تم تسجيل طلبك في نظام العيادة وسيقوم فريق الاستقبال بالتواصل معك هاتفياً أو عبر واتساب لتأكيد الحجز.
                  </p>
                </div>

                <div className="p-4 bg-background border border-border rounded-xl text-right space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted">اسم المريض:</span>
                    <span className="font-bold text-heading">{confirmedBooking.patient_name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted">رقم التواصل:</span>
                    <span className="font-bold text-heading font-mono" dir="ltr">{confirmedBooking.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted">تاريخ الموعد:</span>
                    <span className="font-bold text-primary">{confirmedBooking.preferred_date}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted">الوقت المفضل:</span>
                    <span className="font-bold text-secondary">{confirmedBooking.preferred_time}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  حجز موعد جديد
                </button>
              </div>
            )}

          </div>

          {/* Right: Confirmation State Preview & Live Summary Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Summary Card */}
            <div className="bg-white border border-border p-6 rounded-2xl shadow-card">
              
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    {confirmedBooking ? 'إيصال طلب الحجز الطبي' : 'ملخص الحجز المباشر'}
                  </h3>
                  <p className="text-[11px] text-muted">
                    {confirmedBooking ? 'معتمد ومسجل في قاعدة البيانات' : 'معاينة فورية لتفاصيل زيارتك'}
                  </p>
                </div>
              </div>

              {/* Reference Voucher if confirmed */}
              {confirmedBooking && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted font-medium">رقم المرجع الطبي</span>
                    <span className="text-sm font-bold text-primary font-mono tracking-wider">
                      {confirmedBooking.id.length > 8 ? `MH-${confirmedBooking.id.slice(0, 6).toUpperCase()}` : confirmedBooking.id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyRef(confirmedBooking.id)}
                    className="px-3 py-1 bg-white border border-border text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
                  </button>
                </div>
              )}

              {/* Summary Details Rows */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">person</span>
                    <span>المريض:</span>
                  </span>
                  <span className="font-bold text-heading">
                    {confirmedBooking ? confirmedBooking.patient_name : (patientName || 'لم يُحدد بعد')}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">phone</span>
                    <span>رقم الجوال:</span>
                  </span>
                  <span className="font-bold text-heading font-mono" dir="ltr">
                    {confirmedBooking ? confirmedBooking.phone : (phone || '—')}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-secondary">calendar_today</span>
                    <span>تاريخ الموعد:</span>
                  </span>
                  <span className="font-bold text-heading">
                    {confirmedBooking ? confirmedBooking.preferred_date : preferredDate}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">alarm</span>
                    <span>الوقت المفضل:</span>
                  </span>
                  <span className="font-bold text-primary">
                    {confirmedBooking ? confirmedBooking.preferred_time : preferredTime}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">health_and_safety</span>
                    <span>الطبيب المعالج:</span>
                  </span>
                  <span className="font-bold text-heading">د. خالد المنصوري</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary">pin_drop</span>
                    <span>مقر العيادة:</span>
                  </span>
                  <span className="font-bold text-heading text-[11px]">
                    برج النخبة الطبي، الرياض
                  </span>
                </div>
              </div>

              {/* Instructions Box */}
              <div className="mt-5 p-3.5 bg-background border border-border rounded-xl">
                <span className="text-xs font-bold text-heading flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-primary text-sm">info</span>
                  <span>إرشادات هامة قبل الزيارة:</span>
                </span>
                <ul className="text-[11px] text-body space-y-1 pr-4 list-disc">
                  <li>يرجى الحضور قبل الموعد بـ 10 دقائق لإتمام إجراءات التسجيل.</li>
                  <li>إحضار أي تقارير طبية سابقة أو فحوصات مخبرية حديثة إن وجدت.</li>
                  <li>تتوفر مواقف سيارات خاصة ومجانية للمراجعين في الطابق السفلي.</li>
                </ul>
              </div>

            </div>

            {/* Need Direct Assistance Box */}
            <div className="bg-white border border-border p-5 rounded-2xl shadow-card flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-heading">هل تفضل الحجز المباشر بالهاتف؟</h4>
                <p className="text-[11px] text-muted">فريق الاستقبال جاهز لمساعدتك فوراً</p>
              </div>
              <a
                href="tel:+966114829900"
                className="inline-flex items-center gap-1 bg-background hover:bg-surface-muted border border-border px-3.5 py-2 rounded-xl text-primary text-xs font-bold shadow-sm transition-colors"
                dir="ltr"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>+966 11 482 9900</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
