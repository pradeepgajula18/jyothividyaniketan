import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/data/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      student_name,
      parent_name,
      phone,
      email,
      grade_applying,
      academic_year,
      date_of_birth,
      gender,
      city,
      address,
      message,
    } = body;

    if (!student_name || !parent_name || !phone || !grade_applying) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Student Name, Parent Name, Phone, and Grade Applying).' },
        { status: 400 }
      );
    }

    const created = await dataService.submitAdmissionEnquiry({
      student_name: student_name.trim(),
      parent_name: parent_name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      grade_applying,
      academic_year: academic_year || '2025-2026',
      date_of_birth: date_of_birth || undefined,
      gender: gender || undefined,
      city: city || 'Koilakuntla',
      address: address || undefined,
      message: message ? message.trim() : undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Admission enquiry received successfully! Our admissions counselor will contact you shortly.',
      enquiryId: created.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to submit enquiry at this moment. Please try again or contact the school directly.' },
      { status: 500 }
    );
  }
}

