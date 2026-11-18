import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { dataService } from '@/lib/data/service';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notices = await dataService.getAllNoticesAdmin();
  return NextResponse.json(notices);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const saved = await dataService.saveNotice(body);
    return NextResponse.json({ success: true, notice: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save notice' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await req.json();
    await dataService.deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}

