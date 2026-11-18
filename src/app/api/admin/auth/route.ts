import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPin, createAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin } = body;

    if (!pin || !verifyAdminPin(pin)) {
      return NextResponse.json({ success: false, error: 'Invalid Administrator PIN' }, { status: 401 });
    }

    const token = createAdminToken();
    const cookieStore = cookies();
    cookieStore.set('jvn_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, message: 'Authentication successful' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication processing failed' }, { status: 500 });
  }
}

