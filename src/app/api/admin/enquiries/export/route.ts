import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { dataService } from '@/lib/data/service';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await dataService.getAdmissionEnquiries(1, 1000);
  const enquiries = result.data;

  // Generate CSV Header & rows
  const headers = ['ID', 'Student Name', 'Parent Name', 'Phone', 'Email', 'Grade', 'Academic Year', 'City', 'Status', 'Date', 'Notes'];
  const rows = enquiries.map(e => [
    `"${e.id}"`,
    `"${(e.student_name || '').replace(/"/g, '""')}"`,
    `"${(e.parent_name || '').replace(/"/g, '""')}"`,
    `"${(e.phone || '').replace(/"/g, '""')}"`,
    `"${(e.email || '').replace(/"/g, '""')}"`,
    `"${(e.grade_applying || '').replace(/"/g, '""')}"`,
    `"${(e.academic_year || '').replace(/"/g, '""')}"`,
    `"${(e.city || '').replace(/"/g, '""')}"`,
    `"${(e.status || '').replace(/"/g, '""')}"`,
    `"${(e.created_at || '').slice(0, 10)}"`,
    `"${(e.admin_notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="JVN_Admissions_Enquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

