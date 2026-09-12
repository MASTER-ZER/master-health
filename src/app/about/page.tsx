import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span className="material-symbols-outlined text-sm">chevron_left</span>
          <span className="text-primary font-bold">عن العيادة والطبيب</span>
        </div>

        {/* Doctor Profile Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Right Column (RTL Lead): Physician Portrait & Quick Accreditations */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative bg-white border border-border rounded-2xl p-4 shadow-card">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-primary/5">
                <Image
                  src="/images/doctor.png"
                  alt="الدكتور خالد المنصوري"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Chips */}
                <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-2">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-bold text-heading">متاح للاستشارات والزيارات</span>
                  </div>
                  <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    <span>طبيب استشاري</span>
                  </div>
                </div>
              </div>

              {/* Fast Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="bg-background rounded-xl p-3 text-center border border-border">
                  <p className="text-2xl font-bold text-primary">18+</p>
                  <p className="text-[11px] text-muted font-medium mt-0.5">عاماً من الخبرة</p>
                </div>
                <div className="bg-background rounded-xl p-3 text-center border border-border">
                  <p className="text-2xl font-bold text-secondary">14k+</p>
                  <p className="text-[11px] text-muted font-medium mt-0.5">حالة علاجية ناجحة</p>
                </div>
                <div className="bg-background rounded-xl p-3 text-center border border-border">
                  <p className="text-2xl font-bold text-heading">35+</p>
                  <p className="text-[11px] text-muted font-medium mt-0.5">بحثاً منشوراً دولياً</p>
                </div>
              </div>
            </div>

            {/* Direct Clinic Timing Card */}
            <div className="bg-white border border-border rounded-xl p-4 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">مواعيد العيادة الخاصة</p>
                  <p className="text-xs text-muted">السبت - الأربعاء (4 عصراً - 9 مساءً)</p>
                </div>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center gap-1 text-primary font-bold text-xs hover:text-primary-dark"
              >
                <span>احجز</span>
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </Link>
            </div>
          </div>

          {/* Left Column: Biography, Credentials & Scientific Track */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full mb-3 text-primary">
                <span className="material-symbols-outlined text-sm">person_pin</span>
                <span className="text-xs font-bold">السيرة المهنية والأكاديمية</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-heading tracking-tight mb-2">
                د. خالد بن عبد الرحمن المنصوري
              </h1>
              
              <p className="text-base sm:text-lg text-primary font-semibold mb-4">
                استشاري أول الأمراض الباطنية وأمراض القلب التداخلية والوقائية
              </p>

              <p className="text-body text-sm sm:text-base leading-relaxed">
                يُعد الدكتور خالد المنصوري أحد الكفاءات الطبية الوطنية البارزة في تشخيص وعلاج أمراض القلب والأوعية الدموية والحالات الباطنية المعقدة. يكرس خبرته السريرية التي تمتد لأكثر من 18 عاماً في تعزيز صحة المرضى من خلال نهج سريري وقائي يجمع بين الفهم العميق والتقنيات التشخيصية الحديثة المعتمدة دولياً.
              </p>
            </div>

            {/* Academic & Professional Qualifications */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">school</span>
                <span>المؤهلات والزمالات الدولية</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white border border-border rounded-xl p-4 shadow-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">workspace_premium</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">زمالة الكلية الملكية للأطباء (FRCP)</p>
                    <p className="text-[11px] text-muted">لندن، المملكة المتحدة</p>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-4 shadow-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">البورد الأمريكي والكندي</p>
                    <p className="text-[11px] text-muted">في الأمراض الباطنية وصحة القلب الوقائية</p>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-4 shadow-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">corporate_fare</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">رئيس قسم سابق</p>
                    <p className="text-[11px] text-muted">مستشفى الملك فيصل التخصصي ومركز الأبحاث</p>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-4 shadow-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">local_hospital</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">استشاري وقيادي سريري</p>
                    <p className="text-[11px] text-muted">مدينة الملك فهد الطبية سابقاً بالرياض</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research & Scientific Track */}
            <div className="bg-white border border-border rounded-2xl p-5 sm:p-6 shadow-card">
              <h2 className="text-base font-bold text-heading mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">biotech</span>
                <span>المسيرة البحثية والمشاركات العلمية</span>
              </h2>
              <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
                قاد الدكتور خالد العديد من الدراسات السريرية الوطنية حول عوامل الخطر الوعائية والتشخيص المبكر لأمراض القلب، وله أوراق بحثية منشورة في دوريات محكمة مثل The New England Journal of Medicine ومجلة الكلية الأمريكية لأمراض القلب (JACC).
              </p>
              <div className="flex flex-wrap gap-2">
                {['الطب الوقائي', 'تخطيط القلب المتقدم', 'إدارة ضغط الدم الشرياني', 'رعاية صحية تكاملية'].map((tag) => (
                  <span key={tag} className="bg-background border border-border text-body text-xs font-semibold px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            Clinic Core Values (3 Key Pillars)
        ========================================================================= */}
        <div className="mt-20 pt-8 border-t border-border">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 px-4 py-1 rounded-full mb-3 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>نهجنا وقيمنا الراسخة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-heading">
              ركائز الرعاية الطبية في ماستر هيلث
            </h2>
            <p className="text-body text-sm mt-2">
              صُممت تجربتك السريرية لتمنحك الأمان الصحي الكامل مع إحاطتك بالاحترام والخصوصية التي تستحقها في كل مرحلة من رحلة علاجك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-3xl">hearing</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">
                  الاستماع والرعاية الشخصية
                </h3>
                <p className="text-body text-xs sm:text-sm leading-relaxed">
                  نرفض المعاينات السريعة. نمنح كل مراجع الوقت الكافي الكامل للإصغاء إلى كافة الأعراض وفهم تاريخه ونمط حياته، لبناء خطة علاجية مخصصة بالكامل لاحتياجاته الفردية.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-border flex items-center gap-1.5 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>جلسات استماع مطولة ومفصلة</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-3xl">science</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">
                  الطب القائم على البراهين
                </h3>
                <p className="text-body text-xs sm:text-sm leading-relaxed">
                  نعتمد أحدث البروتوكولات الإكلينيكية المعترف بها عالمياً، مدعومة بتقنيات تشخيصية دقيقة تضمن اتخاذ القرار الطبي الصحيح وتقليل الحاجة إلى التدخلات غير الضرورية.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-border flex items-center gap-1.5 text-secondary text-xs font-bold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>معايير الاعتماد الطبية العالمية</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-3xl">spa</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">
                  الشفافية والراحة النفسية
                </h3>
                <p className="text-body text-xs sm:text-sm leading-relaxed">
                  نشرح حالتك الصحية والخيارات المتاحة لك بلغة واضحة وشفافة تماماً خالية من التعقيد. نعتبرك شريكاً رئيسياً في قرار علاجك، لنمنحك طمأنينة نفسية كاملة.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-border flex items-center gap-1.5 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>وضوح تام لكل خيار علاجي</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            Clinical Feature Badges Strip
        ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
            <span className="material-symbols-outlined text-primary text-2xl">lock</span>
            <div>
              <p className="text-xs font-bold text-heading">سرية تامة</p>
              <p className="text-[11px] text-muted">حفظ رقمي آمن للملفات</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
            <span className="material-symbols-outlined text-secondary text-2xl">wifi</span>
            <div>
              <p className="text-xs font-bold text-heading">خدمات متصلة</p>
              <p className="text-[11px] text-muted">متابعة إلكترونية لنتائجك</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
            <span className="material-symbols-outlined text-primary text-2xl">accessible</span>
            <div>
              <p className="text-xs font-bold text-heading">سهولة الوصول</p>
              <p className="text-[11px] text-muted">مهيأة بالكامل لكبار السن</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
            <span className="material-symbols-outlined text-secondary text-2xl">local_parking</span>
            <div>
              <p className="text-xs font-bold text-heading">مواقف خاصة</p>
              <p className="text-[11px] text-muted">مواقف مجانية للمرضى</p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            Soft Elegant CTA Section
        ========================================================================= */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-white border border-primary/20 rounded-2xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-right">
              <span className="text-xs font-bold text-primary">جاهزون للاهتمام بصحتك وصحة عائلتك</span>
              <h2 className="text-xl sm:text-2xl font-bold text-heading">
                ابدأ رحلتك نحو صحة أفضل اليوم مع د. خالد المنصوري
              </h2>
              <p className="text-xs sm:text-sm text-body max-w-xl">
                يمكنك حجز موعدك بسهولة عبر الموقع واختيار اليوم والوقت الأنسب لك، أو التواصل المباشر مع فريق الاستقبال للمساعدة الفورية.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>احجز استشارتك الآن</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-muted text-heading border border-border px-5 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>تواصل مع العيادة</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
