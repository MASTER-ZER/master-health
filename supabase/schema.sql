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
-- Optional helper table if custom admin table is preferred over pure Supabase Auth
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read admin_users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);
