-- ==============================================================================
-- Master Health Clinic Database Schema (Supabase)
-- ==============================================================================

-- 1. Create table for appointments/bookings
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for efficient dashboard filtering and queries
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings (preferred_date);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Anyone (public anon visitors) can submit/insert a booking
CREATE POLICY "Allow public insert to bookings"
    ON public.bookings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. RLS Policy: Only authenticated staff/admin can view bookings
CREATE POLICY "Allow authenticated staff to view all bookings"
    ON public.bookings
    FOR SELECT
    TO authenticated
    USING (true);

-- 6. RLS Policy: Only authenticated staff/admin can update booking status
CREATE POLICY "Allow authenticated staff to update bookings"
    ON public.bookings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 7. Clinic Settings Table (Dynamic clinic profile managed from Admin Dashboard)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.clinic_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    doctor_name TEXT NOT NULL DEFAULT 'د. خالد المنصوري',
    specialty TEXT NOT NULL DEFAULT 'استشاري أمراض القلب والباطنية',
    phone TEXT NOT NULL DEFAULT '+966 11 482 9900',
    email TEXT NOT NULL DEFAULT 'contact@masterhealth.com',
    address TEXT NOT NULL DEFAULT 'برج النخبة الطبي، طريق الملك فهد، الرياض، المملكة العربية السعودية',
    working_hours TEXT NOT NULL DEFAULT 'السبت - الأربعاء: 04:00 م - 09:00 م | الخميس: 04:00 م - 08:00 م | الجمعة: مغلق',
    about_text TEXT NOT NULL DEFAULT 'نؤمن في عيادة ماستر هيلث بأن الشفاء يبدأ من فهم التاريخ الطبي الكامل للمريض دون استعجال. يكرس الفريق الطبي وقتاً وافياً لكل استشارة سريرية، معتمداً على أحدث الفحوصات والتقنيات لتصميم خطط وقائية وعلاجية مخصصة تناسب أسلوب حياتك.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default settings row if not present
INSERT INTO public.clinic_settings (id, doctor_name, specialty, phone, email, address, working_hours, about_text)
VALUES (
    1,
    'د. خالد المنصوري',
    'استشاري أمراض القلب والباطنية',
    '+966 11 482 9900',
    'contact@masterhealth.com',
    'برج النخبة الطبي، طريق الملك فهد، الرياض، المملكة العربية السعودية',
    'السبت - الأربعاء: 04:00 م - 09:00 م | الخميس: 04:00 م - 08:00 م | الجمعة: مغلق',
    'نؤمن في عيادة ماستر هيلث بأن الشفاء يبدأ من فهم التاريخ الطبي الكامل للمريض دون استعجال. يكرس الفريق الطبي وقتاً وافياً لكل استشارة سريرية، معتمداً على أحدث الفحوصات والتقنيات لتصميم خطط وقائية وعلاجية مخصصة تناسب أسلوب حياتك.'
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for clinic_settings
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

-- Anyone (public visitors) can view clinic settings
CREATE POLICY "Allow public read clinic_settings"
    ON public.clinic_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated admin/service_role can update clinic settings
CREATE POLICY "Allow staff to update clinic_settings"
    ON public.clinic_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

