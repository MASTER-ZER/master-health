import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@masterhealth.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' },
        { status: 400 }
      );
    }

    let isAuthenticated = false;
    let authenticatedEmail = email;

    // 1. First check against default admin credentials
    if (
      email.toLowerCase().trim() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASSWORD
    ) {
      isAuthenticated = true;
      authenticatedEmail = DEFAULT_ADMIN_EMAIL;
    } else if (supabaseUrl && supabaseKey) {
      // 2. Try authenticating with Supabase Auth if provided
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (!error && data.user) {
          isAuthenticated = true;
          authenticatedEmail = data.user.email || email;
        }
      } catch (authErr) {
        console.warn('Supabase auth attempt error:', authErr);
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة. يرجى التأكد من البريد وكلمة المرور.' },
        { status: 401 }
      );
    }

    // Create session cookie
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح!',
      user: {
        email: authenticatedEmail,
        role: 'admin',
      },
    });

    // Set cookie for 7 days
    response.cookies.set('admin_session', 'authenticated_' + Buffer.from(authenticatedEmail).toString('base64'), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: err.message || 'حدث خطأ في معالجة تسجيل الدخول.' },
      { status: 500 }
    );
  }
}
