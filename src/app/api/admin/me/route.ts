import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;

  if (!session || !session.startsWith('authenticated_')) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  let email = 'admin@masterhealth.com';
  try {
    const encoded = session.replace('authenticated_', '');
    email = Buffer.from(encoded, 'base64').toString('utf-8');
  } catch (e) {
    // fallback
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email,
      role: 'admin',
    },
  });
}
