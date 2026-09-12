import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

// Server-side Supabase client
const supabaseServer =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      })
    : null;

// Helper to check connection
function getClientOrError() {
  if (!supabaseServer) {
    return {
      error: 'الاتصال بقاعدة بيانات Supabase غير مهيأ (المفاتيح غير موجودة في بيئة الخادم).',
    };
  }
  return { client: supabaseServer };
}

// GET: Fetch all bookings directly from Supabase
export async function GET() {
  const { client, error: clientErr } = getClientOrError();
  if (clientErr || !client) {
    return NextResponse.json({ error: clientErr }, { status: 500 });
  }

  try {
    const { data, error } = await client
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch bookings error:', error);
      return NextResponse.json(
        {
          error: `تعذر جلب الحجوزات من قاعدة بيانات Supabase: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (err: any) {
    console.error('Server error on fetching bookings:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ غير متوقع أثناء استرجاع الحجوزات.' },
      { status: 500 }
    );
  }
}

// POST: Insert a new booking directly to Supabase
export async function POST(request: NextRequest) {
  const { client, error: clientErr } = getClientOrError();
  if (clientErr || !client) {
    return NextResponse.json({ error: clientErr }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { patient_name, phone, preferred_date, preferred_time, note } = body;

    // 1. Validation
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

    // 2. Direct Supabase INSERT
    const { data, error } = await client
      .from('bookings')
      .insert([
        {
          patient_name: patient_name.trim(),
          phone: cleanPhone,
          preferred_date,
          preferred_time,
          note: note ? note.trim() : null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert failed:', error);
      return NextResponse.json(
        {
          error: 'حدث خطأ أثناء حفظ الحجز، برجاء المحاولة لاحقًا أو الاتصال بالعيادة مباشرة.',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'تم تسجيل وتخزين الحجز بنجاح في قاعدة بيانات العيادة!',
        booking: data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Server error on booking:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ غير متوقع أثناء معالجة الحجز.' },
      { status: 500 }
    );
  }
}

// PATCH: Update booking status directly in Supabase
export async function PATCH(request: NextRequest) {
  const { client, error: clientErr } = getClientOrError();
  if (clientErr || !client) {
    return NextResponse.json({ error: clientErr }, { status: 500 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'المعرف وحالة الحجز (pending/confirmed/cancelled) مطلوبان.' },
        { status: 400 }
      );
    }

    const { data, error } = await client
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase status update error:', error);
      return NextResponse.json(
        {
          error: `تعذر تحديث حالة الحجز في قاعدة بيانات Supabase: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم تحديث حالة الحجز في قاعدة البيانات بنجاح.',
      booking: data,
    });
  } catch (err: any) {
    console.error('Server error on status update:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ أثناء تحديث الحالة.' },
      { status: 500 }
    );
  }
}
