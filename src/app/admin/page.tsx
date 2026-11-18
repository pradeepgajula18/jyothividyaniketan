import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { dataService } from '@/lib/data/service';
import AdminDashboardClient from './AdminDashboardClient';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Administrator CMS Portal | Jyothi Vidya Niketan',
  description: 'Secure management portal for Jyothi Vidya Niketan E.M. High School Koilakuntla.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('jvn_admin_token')?.value;
  const isAuthenticated = verifyAdminToken(token);

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  // Fetch all initial datasets for CMS
  const [
    settings,
    enquiriesResult,
    albumsResult,
    noticesResult,
    facultyResult,
    disclosures,
    announcements,
    eventsResult,
    achievementsResult,
    downloads,
    faqs,
    auditLogs,
  ] = await Promise.all([
    dataService.getSiteSettings(),
    dataService.getAdmissionEnquiries(1, 100),
    dataService.getAllAlbumsAdmin(),
    dataService.getAllNoticesAdmin(),
    dataService.getAllFacultyAdmin(),
    dataService.getAllDisclosuresAdmin(),
    dataService.getAllAnnouncements(),
    dataService.getAllEventsAdmin(),
    dataService.getAllAchievementsAdmin(),
    dataService.getDownloads(),
    dataService.getFAQs(),
    dataService.getAuditLogs(20),
  ]);

  return (
    <AdminDashboardClient
      initialSettings={settings}
      initialEnquiries={enquiriesResult.data}
      initialAlbums={albumsResult}
      initialNotices={noticesResult}
      initialFaculty={facultyResult}
      initialDisclosures={disclosures}
      initialAnnouncements={announcements}
      initialEvents={eventsResult}
      initialAchievements={achievementsResult}
      initialDownloads={downloads}
      initialFAQs={faqs}
      initialAuditLogs={auditLogs}
    />
  );
}

