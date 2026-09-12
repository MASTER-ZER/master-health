import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح.',
  });

  // Clear cookie
  response.cookies.set('admin_session', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
