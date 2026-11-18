import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { dataService } from '@/lib/data/service';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await dataService.getSiteSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  if (!verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const updated = await dataService.updateSiteSettings(body);
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
    } catch (e) {}
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

