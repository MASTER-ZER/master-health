import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_CLINIC_SETTINGS } from '@/lib/settings';
import { ClinicSettings } from '@/lib/types';

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

// GET: Fetch clinic settings
export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({
      settings: DEFAULT_CLINIC_SETTINGS,
      isDefault: true,
    });
  }

  try {
    const { data, error } = await supabaseServer
      .from('clinic_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error || !data) {
      // Return default settings if table doesn't exist yet
      return NextResponse.json({
        settings: DEFAULT_CLINIC_SETTINGS,
        isDefault: true,
        note: error ? error.message : 'No custom settings saved yet',
      });
    }

    return NextResponse.json({
      settings: data as ClinicSettings,
      isDefault: false,
    });
  } catch (err: any) {
    console.error('Fetch clinic settings error:', err);
    return NextResponse.json({
      settings: DEFAULT_CLINIC_SETTINGS,
      isDefault: true,
    });
  }
}

// PUT: Update clinic settings (Protected for authenticated admin only)
export async function PUT(request: NextRequest) {
  // 1. Check admin authentication via session cookie
  const adminSession = request.cookies.get('admin_session')?.value;
  if (!adminSession || !adminSession.startsWith('authenticated_')) {
    return NextResponse.json(
      { error: 'غير مصرح: يجب تسجيل الدخول كمسؤول أولاً لتعديل الإعدادات.' },
      { status: 401 }
    );
  }

  if (!supabaseServer) {
    return NextResponse.json(
      { error: 'الاتصال بقاعدة بيانات Supabase غير مهيأ.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      doctor_name,
      specialty,
      phone,
      email,
      address,
      working_hours,
      about_text,
    } = body;

    // Validation
    if (!doctor_name || !phone) {
      return NextResponse.json(
        { error: 'يرجى إدخال اسم الطبيب ورقم الهاتف على الأقل.' },
        { status: 400 }
      );
    }

    const payload: ClinicSettings = {
      id: 1,
      doctor_name: doctor_name.trim(),
      specialty: specialty ? specialty.trim() : DEFAULT_CLINIC_SETTINGS.specialty,
      phone: phone.trim(),
      email: email ? email.trim() : DEFAULT_CLINIC_SETTINGS.email,
      address: address ? address.trim() : DEFAULT_CLINIC_SETTINGS.address,
      working_hours: working_hours ? working_hours.trim() : DEFAULT_CLINIC_SETTINGS.working_hours,
      about_text: about_text ? about_text.trim() : DEFAULT_CLINIC_SETTINGS.about_text,
      updated_at: new Date().toISOString(),
    };

    // Upsert into clinic_settings where id = 1
    const { data, error } = await supabaseServer
      .from('clinic_settings')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Update clinic settings error:', error);
      return NextResponse.json(
        {
          error: `تعذر حفظ الإعدادات في قاعدة بيانات Supabase: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم حفظ وتحديث بيانات العيادة بنجاح في قاعدة البيانات!',
      settings: data,
    });
  } catch (err: any) {
    console.error('PUT settings server error:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ غير متوقع أثناء حفظ الإعدادات.' },
      { status: 500 }
    );
  }
}
