import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabaseServer =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      })
    : null;

// Initial sample bookings if database table is not yet created
const fallbackBookings = [
  {
    id: 'b1a2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    patient_name: 'سارة محمد الشهري',
    phone: '0553219874',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '04:30 مساءً',
    note: 'فحص دوري واستشارة بخصوص ضغط الدم',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'f2b3c4d5-e6a7-8b9c-0d1e-2f3a4b5c6d7e',
    patient_name: 'عبدالرحمن بن سعود التميمي',
    phone: '0554128920',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '05:30 مساءً',
    note: 'متابعة نتائج تخطيط القلب ومراجعة الأدوية',
    status: 'confirmed',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'a3b4c5d6-e7f8-9a0b-1c2d-3e4f5a6b7c8d',
    patient_name: 'فيصل عبد العزيز القحطاني',
    phone: '0501122334',
    preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferred_time: '07:45 مساءً',
    note: 'استشارة رأي طبي ثانٍ قبل القسطرة',
    status: 'confirmed',
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'c4d5e6f7-a8b9-0c1d-2e3f-4a5b6c7d8e9f',
    patient_name: 'منى إبراهيم الدوسري',
    phone: '0549988776',
    preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferred_time: '11:30 صباحاً',
    note: 'اعتذار بسبب السفر وتغيير الموعد',
    status: 'cancelled',
    created_at: new Date(Date.now() - 28800000).toISOString(),
  },
];

// In-memory cache for demo fallbacks if table isn't created in Supabase yet
let inMemoryBookings = [...fallbackBookings];

// GET: Fetch all bookings
export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({ bookings: inMemoryBookings, isDemo: true });
  }

  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, using fallback:', error.message);
      return NextResponse.json({
        bookings: inMemoryBookings,
        isDemo: true,
        supabaseError: error.message,
      });
    }

    return NextResponse.json({
      bookings: data && data.length > 0 ? data : inMemoryBookings,
      isDemo: !data || data.length === 0,
    });
  } catch (err: any) {
    console.error('Fetch bookings error:', err);
    return NextResponse.json({ bookings: inMemoryBookings, isDemo: true });
  }
}

// POST: Insert a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patient_name, phone, preferred_date, preferred_time, note } = body;

    // Validation
    if (!patient_name || typeof patient_name !== 'string' || patient_name.trim().length < 3) {
      return NextResponse.json(
        { error: 'يرجى إدخال اسم المريض الثلاثي بشكل صحيح (3 أحرف على الأقل).' },
        { status: 400 }
      );
    }

    const cleanPhone = phone ? phone.replace(/[\s\-\(\)]/g, '') : '';
    const phoneRegex = /^((\+?966|0)?5\d{8}|(\+?20|0)?1[0125]\d{8}|\+?[1-9]\d{7,14})$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'يرجى إدخال رقم هاتف صحيح للتواصل (مثال: 05xxxxxxxx).' },
        { status: 400 }
      );
    }

    if (!preferred_date) {
      return NextResponse.json(
        { error: 'يرجى تحديد تاريخ الموعد المطلوب.' },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (preferred_date < todayStr) {
      return NextResponse.json(
        { error: 'لا يمكن حجز موعد في تاريخ سابق لليوم.' },
        { status: 400 }
      );
    }

    if (!preferred_time) {
      return NextResponse.json(
        { error: 'يرجى اختيار الفترة أو الوقت المفضل.' },
        { status: 400 }
      );
    }

    const newBookingObj = {
      patient_name: patient_name.trim(),
      phone: cleanPhone,
      preferred_date,
      preferred_time,
      note: note ? note.trim() : null,
      status: 'pending' as const,
    };

    if (supabaseServer) {
      const { data, error } = await supabaseServer
        .from('bookings')
        .insert([newBookingObj])
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json(
          {
            success: true,
            message: 'تم تسجيل الحجز بنجاح في Supabase!',
            booking: data,
          },
          { status: 201 }
        );
      } else {
        console.warn('Supabase insert failed, caching locally:', error?.message);
      }
    }

    // Fallback: save to memory
    const fallbackBooking = {
      id: 'MH-' + Math.floor(10000 + Math.random() * 90000),
      ...newBookingObj,
      created_at: new Date().toISOString(),
    };
    inMemoryBookings.unshift(fallbackBooking);

    return NextResponse.json(
      {
        success: true,
        message: 'تم تسجيل الحجز بنجاح!',
        booking: fallbackBooking,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ غير متوقع في الخادم.' },
      { status: 500 }
    );
  }
}

// PATCH: Update booking status
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'المعرف وحالة الحجز (pending/confirmed/cancelled) مطلوبان.' },
        { status: 400 }
      );
    }

    // Try updating in Supabase
    if (supabaseServer) {
      const { data, error } = await supabaseServer
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          message: 'تم تحديث حالة الحجز في قاعدة البيانات بنجاح.',
          booking: data,
        });
      }
    }

    // Fallback update in memory
    const index = inMemoryBookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      inMemoryBookings[index].status = status;
      return NextResponse.json({
        success: true,
        message: 'تم تحديث حالة الحجز بنجاح.',
        booking: inMemoryBookings[index],
      });
    }

    return NextResponse.json(
      { error: 'لم يتم العثور على الحجز المطلوب.' },
      { status: 404 }
    );
  } catch (err: any) {
    console.error('Update status error:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ أثناء تحديث الحالة.' },
      { status: 500 }
    );
  }
}
