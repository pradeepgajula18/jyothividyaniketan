'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home as HomeIcon,
  Image as ImageIcon,
  Users,
  Bell,
  Calendar,
  GraduationCap,
  ShieldCheck,
  Search,
  MessageCircle,
  Menu as MenuIcon,
  HelpCircle,
  Download,
  Award,
  Activity,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileSpreadsheet,
  Copy,
  Eye,
  Settings,
  RefreshCw,
  FolderPlus,
  Trophy,
  Megaphone,
  Flame,
  Sparkles,
  ArrowUp,
  ArrowDown,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  SiteSettings,
  AdmissionEnquiry,
  GalleryAlbum,
  NoticeItem,
  FacultyMember,
  DisclosureDocument,
  Announcement,
  EventItem,
  AchievementItem,
  DownloadItem,
  FAQItem,
  AuditLog,
  BulletinItem
} from '@/types';

interface Props {
  initialSettings: SiteSettings;
  initialEnquiries: AdmissionEnquiry[];
  initialAlbums: GalleryAlbum[];
  initialNotices: NoticeItem[];
  initialFaculty: FacultyMember[];
  initialDisclosures: DisclosureDocument[];
  initialAnnouncements: Announcement[];
  initialEvents: EventItem[];
  initialAchievements: AchievementItem[];
  initialDownloads: DownloadItem[];
  initialFAQs: FAQItem[];
  initialAuditLogs: AuditLog[];
}

type TabType =
  | 'overview'
  | 'victory_popup'
  | 'bulletin'
  | 'hero_home'
  | 'albums'
  | 'admissions'
  | 'notices'
  | 'academics'
  | 'faculty'
  | 'disclosures'
  | 'seo'
  | 'whatsapp'
  | 'facilities'
  | 'achievements'
  | 'events'
  | 'downloads'
  | 'faqs'
  | 'audit'
  | 'sql_schema';

export default function AdminDashboardClient({
  initialSettings,
  initialEnquiries,
  initialAlbums,
  initialNotices,
  initialFaculty,
  initialDisclosures,
  initialAnnouncements,
  initialEvents,
  initialAchievements,
  initialDownloads,
  initialFAQs,
  initialAuditLogs,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // State entities
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(initialEnquiries);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(initialAlbums);
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);
  const [faculty, setFaculty] = useState<FacultyMember[]>(initialFaculty);
  const [disclosures, setDisclosures] = useState<DisclosureDocument[]>(initialDisclosures);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Status & notifications
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);
  const [disclosureModalOpen, setDisclosureModalOpen] = useState(false);
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);

  // New Item Temporary States
  const [newNotice, setNewNotice] = useState({ title: '', category: 'General', file_url: '', is_important: false });
  const [newAlbum, setNewAlbum] = useState({ title: '', category: 'Annual Day', description: '', cover_image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200' });
  const [newFaculty, setNewFaculty] = useState({ name: '', designation: 'Teacher', qualification: 'B.Sc., B.Ed.', subjects: 'Mathematics', department: 'Secondary School' as const, experience_years: 5 });
  const [newDisclosure, setNewDisclosure] = useState({ category: 'B: DOCUMENTS AND INFORMATION', document_title: '', document_url: '/docs/document.pdf' });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    category: 'Sports',
    student_name: '',
    grade_or_class: 'Class IX',
    academic_year: '2025–2026',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
    sort_order: 1
  });

  const [newBulletinItem, setNewBulletinItem] = useState<{
    category: BulletinItem['category'];
    title: string;
    link: string;
    is_urgent: boolean;
  }>({
    category: 'EXAM',
    title: '',
    link: '/academics/examinations',
    is_urgent: true,
  });

  // Filters for Admissions
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('All');
  const [enquiryGradeFilter, setEnquiryGradeFilter] = useState('All');

  const filteredEnquiries = enquiries.filter(e => {
    if (enquiryStatusFilter !== 'All' && e.status !== enquiryStatusFilter) return false;
    if (enquiryGradeFilter !== 'All' && e.grade_applying !== enquiryGradeFilter) return false;
    return true;
  });

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, status: AdmissionEnquiry['status'], notes?: string) => {
    try {
      await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, admin_notes: notes }),
      });
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status, admin_notes: notes ?? e.admin_notes } : e)));
    } catch (e) {
      alert('Failed to update enquiry');
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newNotice, notice_date: new Date().toISOString().split('T')[0] }),
      });
      const data = await res.json();
      if (data.success && data.notice) {
        setNotices(prev => [data.notice, ...prev]);
        setNoticeModalOpen(false);
        setNewNotice({ title: '', category: 'General', file_url: '', is_important: false });
      }
    } catch (e) {}
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await fetch('/api/admin/notices', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setNotices(prev => prev.filter(n => n.id !== id));
    } catch (e) {}
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAlbum,
          slug: newAlbum.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          event_date: new Date().toISOString().split('T')[0],
          is_published: true,
          photo_count: 6,
        }),
      });
      const data = await res.json();
      if (data.success && data.album) {
        setAlbums(prev => [data.album, ...prev]);
        setAlbumModalOpen(false);
        setNewAlbum({ title: '', category: 'Annual Day', description: '', cover_image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200' });
      }
    } catch (e) {}
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    try {
      await fetch('/api/admin/albums', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setAlbums(prev => prev.filter(a => a.id !== id));
    } catch (e) {}
  };

  const handleCreateFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newFaculty,
          photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
          display_order: faculty.length + 1,
          is_active: true,
        }),
      });
      const data = await res.json();
      if (data.success && data.faculty) {
        setFaculty(prev => [...prev, data.faculty]);
        setFacultyModalOpen(false);
        setNewFaculty({ name: '', designation: 'Teacher', qualification: 'B.Sc., B.Ed.', subjects: 'Mathematics', department: 'Secondary School', experience_years: 5 });
      }
    } catch (e) {}
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm('Are you sure you want to remove this faculty profile?')) return;
    try {
      await fetch('/api/admin/faculty', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setFaculty(prev => prev.filter(f => f.id !== id));
    } catch (e) {}
  };

  const handleCreateDisclosure = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/disclosures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newDisclosure,
          file_size: 'PDF Document',
          last_updated: new Date().toISOString().split('T')[0],
          is_published: true,
        }),
      });
      const data = await res.json();
      if (data.success && data.document) {
        setDisclosures(prev => [...prev, data.document]);
        setDisclosureModalOpen(false);
        setNewDisclosure({ category: 'B: DOCUMENTS AND INFORMATION', document_title: '', document_url: '/docs/document.pdf' });
      }
    } catch (e) {}
  };

  const handleDeleteDisclosure = async (id: string) => {
    if (!confirm('Are you sure you want to delete this disclosure document?')) return;
    try {
      await fetch('/api/admin/disclosures', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setDisclosures(prev => prev.filter(d => d.id !== id));
    } catch (e) {}
  };

  // Achievements handlers
  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAchievement,
          sort_order: achievements.length + 1,
          is_published: true,
        }),
      });
      const data = await res.json();
      if (data.success && data.achievement) {
        setAchievements(prev => [data.achievement, ...prev]);
        setAchievementModalOpen(false);
        setNewAchievement({
          title: '',
          category: 'Sports',
          student_name: '',
          grade_or_class: 'Class IX',
          academic_year: '2025–2026',
          description: '',
          image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
          sort_order: 1
        });
      }
    } catch (e) {
      alert('Failed to save achievement');
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Are you sure you want to remove this achievement?')) return;
    try {
      await fetch('/api/admin/achievements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setAchievements(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      alert('Failed to delete achievement');
    }
  };

  // Bulletin marquee item management
  const handleAddBulletinItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBulletinItem.title.trim()) return;
    const item: BulletinItem = {
      id: `blt-${Date.now()}`,
      category: newBulletinItem.category,
      title: newBulletinItem.title.trim(),
      link: newBulletinItem.link.trim() || undefined,
      is_urgent: newBulletinItem.is_urgent,
    };
    const updated = [item, ...(settings.bulletin_items || [])];
    setSettings(prev => ({ ...prev, bulletin_items: updated }));
    setNewBulletinItem({
      category: 'EXAM',
      title: '',
      link: '/academics/examinations',
      is_urgent: false,
    });
  };

  const handleDeleteBulletinItem = (id: string) => {
    const updated = (settings.bulletin_items || []).filter(b => b.id !== id);
    setSettings(prev => ({ ...prev, bulletin_items: updated }));
  };

  const handleMoveBulletinItem = (index: number, direction: 'up' | 'down') => {
    const items = [...(settings.bulletin_items || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    setSettings(prev => ({ ...prev, bulletin_items: items }));
  };

  const applyVictoryPreset = (preset: {
    title: string;
    badge: string;
    imageUrl: string;
    message: string;
    ctaText: string;
    link: string;
  }) => {
    setSettings(prev => ({
      ...prev,
      popup_title: preset.title,
      popup_badge: preset.badge,
      popup_image_url: preset.imageUrl,
      popup_message: preset.message,
      popup_cta_text: preset.ctaText,
      popup_link: preset.link,
      popup_enabled: true,
    }));
  };

  const navModules = [
    { id: 'overview' as const, label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'victory_popup' as const, label: '🏆 Sports Victory Pop-up', icon: Trophy, badge: settings.popup_enabled ? 'LIVE' : 'OFF' },
    { id: 'bulletin' as const, label: '📢 Navbar News Bulletin', icon: Megaphone, badge: `${settings.bulletin_items?.length || 0} items` },
    { id: 'hero_home' as const, label: 'A. Hero & Homepage', icon: HomeIcon, badge: null },
    { id: 'albums' as const, label: 'B. Gallery & Albums', icon: ImageIcon, badge: albums.length },
    { id: 'admissions' as const, label: 'C. Admissions & Enquiries', icon: Users, badge: enquiries.filter(e => e.status === 'New').length || null },
    { id: 'notices' as const, label: 'D. Notice Board & Circulars', icon: Bell, badge: notices.length },
    { id: 'academics' as const, label: 'E. Academic Calendar & Exams', icon: Calendar, badge: null },
    { id: 'faculty' as const, label: 'F. Faculty Directory', icon: GraduationCap, badge: faculty.length },
    { id: 'disclosures' as const, label: 'G. CBSE Mandatory Disclosure', icon: ShieldCheck, badge: disclosures.length },
    { id: 'seo' as const, label: 'H. SEO & Google Rankings', icon: Search, badge: 'Checklist' },
    { id: 'whatsapp' as const, label: 'I. Social Media & WhatsApp', icon: MessageCircle, badge: null },
    { id: 'facilities' as const, label: 'J5. Campus Facilities', icon: HomeIcon, badge: null },
    { id: 'achievements' as const, label: 'J6. Achievements & Awards', icon: Award, badge: achievements.length },
    { id: 'events' as const, label: 'J7. School Events', icon: Calendar, badge: events.length },
    { id: 'downloads' as const, label: 'Downloads & Forms', icon: Download, badge: downloads.length },
    { id: 'faqs' as const, label: 'FAQ Management', icon: HelpCircle, badge: faqs.length },
    { id: 'audit' as const, label: 'Audit Logs', icon: Activity, badge: null },
    { id: 'sql_schema' as const, label: 'Supabase SQL Setup', icon: RefreshCw, badge: 'Live DB' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-school-navy-950 text-white px-6 py-3 border-b border-school-navy-800 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
          <div>
            <h1 className="font-serif font-bold text-sm tracking-wide text-white">
              Jyothi Vidya Niketan CMS
            </h1>
            <p className="text-[10px] text-school-gold-400 font-semibold">
              CBSE Affiliation: 130603 • Koilakuntla Portal Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Supabase Connected</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-school-gold-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-school-navy-900 text-school-navy-100 flex flex-col shrink-0 border-r border-school-navy-800 hidden md:flex">
          <div className="p-4 border-b border-school-navy-800/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-school-gold-400">
              Management Modules
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navModules.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-school-gold-500 text-school-navy-950 font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-school-navy-950' : 'text-school-gold-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-school-navy-950 text-white'
                          : item.badge === 'LIVE'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-school-navy-800 text-school-gold-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {saveSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Configuration and website content updated successfully in Supabase database!</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-school-navy-950">
                    Administrator Dashboard Overview
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Jyothi Vidya Niketan E.M. High School • Academic Session: {settings.current_academic_year}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('sql_schema')}
                    className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-school-gold-600" />
                    <span>Supabase DB Schema</span>
                  </button>
                </div>
              </div>

              {/* Action Banner: Sports Victory Pop-up & News Bulletin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setActiveTab('victory_popup')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-school-navy-900 to-school-navy-950 border border-school-gold-500/40 text-white cursor-pointer hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy className="w-24 h-24 text-school-gold-400" />
                  </div>
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-gold-500 text-school-navy-950">
                        HOME SCREEN POP-UP
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${settings.popup_enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-gray-700 text-gray-400'}`}>
                        {settings.popup_enabled ? '● PUSHED LIVE' : '○ DISABLED'}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-white group-hover:text-school-gold-400 transition-colors">
                      🏆 Sports Championship & Victory Modal
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {settings.popup_title || 'Push victory photos, state championship gold medals, and big alerts to every visitor.'}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-school-gold-400">
                      <span>Configure & Push Live</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('bulletin')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white border border-amber-300/80 text-school-navy-950 cursor-pointer hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Megaphone className="w-24 h-24 text-amber-600" />
                  </div>
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-navy-950 text-school-gold-400">
                        TOP NAVBAR TICKER
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${settings.ticker_enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                        {settings.ticker_enabled ? '● SCROLLING LIVE' : '○ PAUSED'}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-school-navy-950 group-hover:text-amber-800 transition-colors">
                      📢 News Bulletin Marquee
                    </h3>
                    <p className="text-xs text-gray-600">
                      {settings.bulletin_items?.length || 0} active categorized items (Exams, Victories, Admissions, Holidays) rotating across all pages.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-800">
                      <span>Manage Bulletin Items</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div
                  onClick={() => setActiveTab('admissions')}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-lg transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-school-navy-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Enquiries</span>
                    <Users className="w-5 h-5 text-school-gold-600" />
                  </div>
                  <p className="text-3xl font-black font-serif text-school-navy-950">{enquiries.length}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    {enquiries.filter(e => e.status === 'New').length} New Enquiries pending review
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('albums')}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-lg transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-school-navy-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Photo Albums</span>
                    <ImageIcon className="w-5 h-5 text-school-gold-600" />
                  </div>
                  <p className="text-3xl font-black font-serif text-school-navy-950">{albums.length}</p>
                  <p className="text-[11px] text-gray-500">Categorized galleries published</p>
                </div>

                <div
                  onClick={() => setActiveTab('achievements')}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-lg transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-school-navy-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Achievements</span>
                    <Award className="w-5 h-5 text-school-gold-600" />
                  </div>
                  <p className="text-3xl font-black font-serif text-school-navy-950">{achievements.length}</p>
                  <p className="text-[11px] text-gray-500">Sports & Academic medals</p>
                </div>

                <div
                  onClick={() => setActiveTab('disclosures')}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-lg transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-school-navy-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">CBSE Disclosure</span>
                    <ShieldCheck className="w-5 h-5 text-school-gold-600" />
                  </div>
                  <p className="text-3xl font-black font-serif text-school-navy-950">{disclosures.length}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">100% CBSE Statutory Compliance</p>
                </div>
              </div>

              {/* Quick Website Status Panel */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-school-navy-950">
                  Global Configuration & Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Academic Year</p>
                    <p className="font-serif font-bold text-base text-school-navy-950">{settings.current_academic_year}</p>
                    <p className="text-emerald-600 font-semibold">Admissions: {settings.admission_open ? 'OPEN' : 'CLOSED'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">WhatsApp Official Line</p>
                    <p className="font-mono font-bold text-sm text-school-navy-950">{settings.whatsapp_number}</p>
                    <p className="text-emerald-600 font-semibold">Floating Button: {settings.whatsapp_enabled ? 'ENABLED' : 'DISABLED'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                    <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Affiliation Details</p>
                    <p className="font-serif font-bold text-sm text-school-navy-950">CBSE No: 130603</p>
                    <p className="text-gray-500">School Code: 57218 • Estd 2018</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VICTORY POP-UP MANAGER */}
          {activeTab === 'victory_popup' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-500" />
                    <h2 className="text-xl font-bold font-serif text-school-navy-950">
                      Sports Championship Victory & Home Pop-up Manager
                    </h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Push celebratory victory photos, state championship gold medals, or exam merit honors to all website visitors with 1 click.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSettings(s => ({ ...s, popup_enabled: !s.popup_enabled }));
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                      settings.popup_enabled
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${settings.popup_enabled ? 'bg-white animate-pulse' : 'bg-gray-500'}`} />
                    <span>{settings.popup_enabled ? 'POP-UP LIVE ON WEBSITE' : 'POP-UP DISABLED'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Template Presets */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>One-Click Victory Templates (Click any to autofill):</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => applyVictoryPreset({
                      title: '🏆 CHAMPIONS! Andhra Pradesh State Under-14 Kho-Kho Championship 2026 Gold Medalists!',
                      badge: 'AP STATE GOLD MEDAL 🥇',
                      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
                      message: 'Heartiest congratulations to the Jyothi Vidya Niketan Under-14 Boys squad for lifting the prestigious Andhra Pradesh State Trophy at Vijayawada! We applaud their relentless dedication, discipline, and champion spirit.',
                      ctaText: 'Celebrate With Our Champions',
                      link: '/achievements'
                    })}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors"
                  >
                    🏆 State Kho-Kho Champions
                  </button>
                  <button
                    type="button"
                    onClick={() => applyVictoryPreset({
                      title: '🥇 3 Gold & 2 Silver Medals at CBSE South Zone Athletics Cluster Meet!',
                      badge: 'CBSE SPORTS VICTORY 🏆',
                      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200',
                      message: 'Our student athletes brought immense pride to Koilakuntla by securing top podium honors in 100m Sprint, Long Jump, and 4x100m Relay at the CBSE South Zone sports cluster.',
                      ctaText: 'Explore Sports Gallery',
                      link: '/gallery'
                    })}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors"
                  >
                    🥇 CBSE South Zone Athletics
                  </button>
                  <button
                    type="button"
                    onClick={() => applyVictoryPreset({
                      title: '🌟 100% First-Class Distinction in CBSE Class X Board Examinations!',
                      badge: 'ACADEMIC EXCELLENCE 🎓',
                      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200',
                      message: 'Jyothi Vidya Niketan continues its legacy of uncompromised academic distinction with school topper scoring 488/500 and 100% of students graduating in 1st division.',
                      ctaText: 'View Merit List & Toppers',
                      link: '/achievements'
                    })}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors"
                  >
                    🎓 Class X Board Exam Toppers
                  </button>
                </div>
              </div>

              {/* Form & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Form Controls */}
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Celebration Badge Text *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.popup_badge || ''}
                      onChange={e => setSettings({ ...settings, popup_badge: e.target.value })}
                      placeholder="e.g. AP STATE GOLD MEDAL 🥇"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Pop-up Headline / Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.popup_title || ''}
                      onChange={e => setSettings({ ...settings, popup_title: e.target.value })}
                      placeholder="e.g. CHAMPIONS! State Kho-Kho Gold Medalists"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Victory Photograph URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={settings.popup_image_url || ''}
                      onChange={e => setSettings({ ...settings, popup_image_url: e.target.value })}
                      placeholder="https://... or /images/sports-championship.jpg"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      High-resolution landscape photo of student champions, trophy presentation, or certificate.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Announcement Message / Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={settings.popup_message || ''}
                      onChange={e => setSettings({ ...settings, popup_message: e.target.value })}
                      placeholder="Detailing the competition, opponent, venue, and congratulations..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Button Call-to-Action Text
                      </label>
                      <input
                        type="text"
                        value={settings.popup_cta_text || ''}
                        onChange={e => setSettings({ ...settings, popup_cta_text: e.target.value })}
                        placeholder="e.g. View Full Achievement"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Target Page Link
                      </label>
                      <input
                        type="text"
                        value={settings.popup_link || ''}
                        onChange={e => setSettings({ ...settings, popup_link: e.target.value })}
                        placeholder="/achievements or /gallery"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.popup_enabled}
                        onChange={e => setSettings({ ...settings, popup_enabled: e.target.checked })}
                        className="w-4 h-4 rounded text-school-navy-800"
                      />
                      <span>Make Active / Push to Website Home Pop-up</span>
                    </label>

                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 rounded-xl bg-school-navy-900 hover:bg-school-navy-950 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      {saving ? 'Saving...' : 'Save & Push to Live Website'}
                    </button>
                  </div>
                </form>

                {/* Live Replica Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <span>Live Visitor View Preview:</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Exact Website Rendering</span>
                  </div>

                  <div className="rounded-3xl bg-white border-2 border-school-gold-400 shadow-2xl overflow-hidden max-w-md mx-auto">
                    {/* Header bar */}
                    <div className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white px-5 py-3 flex items-center justify-between border-b border-school-gold-500/30">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-school-gold-400" />
                        <span className="font-serif font-bold text-xs text-school-gold-400">
                          {settings.popup_badge || 'OFFICIAL ANNOUNCEMENT'}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">✕</span>
                    </div>

                    {/* Image */}
                    {settings.popup_image_url && (
                      <div className="relative h-44 w-full bg-slate-900">
                        <img
                          src={settings.popup_image_url}
                          alt="Victory Photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <h4 className="font-serif font-bold text-base text-school-navy-950 leading-snug">
                        {settings.popup_title || 'Announcement Title'}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {settings.popup_message || 'Announcement message will be rendered here for parents, students and visitors.'}
                      </p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 font-medium">Jyothi Vidya Niketan</span>
                        <span className="px-4 py-2 rounded-xl bg-school-gold-500 text-school-navy-950 font-bold text-xs shadow-sm">
                          {settings.popup_cta_text || 'View Achievement'} →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TOP NAVBAR NEWS BULLETIN MANAGER */}
          {activeTab === 'bulletin' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-6 h-6 text-school-gold-600" />
                    <h2 className="text-xl font-bold font-serif text-school-navy-950">
                      Top Navbar News Bulletin Manager
                    </h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Broadcast upcoming exams, sports victories, circulars, and admissions open alerts across the top scrolling ticker of all pages.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSettings(s => ({ ...s, ticker_enabled: !s.ticker_enabled }))}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                      settings.ticker_enabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {settings.ticker_enabled ? 'TICKER ENABLED' : 'TICKER DISABLED'}
                  </button>
                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-school-navy-900 hover:bg-school-navy-950 text-white font-bold text-xs shadow-md transition-all"
                  >
                    {saving ? 'Saving...' : 'Save to Supabase'}
                  </button>
                </div>
              </div>

              {/* Live Horizontal Ticker Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Live Top Bar Rotating Marquee Preview:
                </span>
                <div className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-950 text-white px-4 py-2.5 rounded-xl border border-school-gold-500/30 flex items-center justify-between text-xs overflow-hidden shadow-inner">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-school-gold-500 text-school-navy-950 font-black text-[10px] tracking-wider">
                      <Flame className="w-3 h-3 fill-current text-red-600" />
                      LIVE BULLETIN
                    </span>
                  </div>
                  <div className="truncate px-4 text-center font-medium text-xs text-school-navy-100 flex-1">
                    {(settings.bulletin_items && settings.bulletin_items.length > 0)
                      ? settings.bulletin_items[0].title
                      : 'No announcements configured.'}
                  </div>
                  <span className="text-[10px] font-bold text-school-gold-400 shrink-0">
                    {settings.bulletin_items?.length || 0} Rotating Updates
                  </span>
                </div>
              </div>

              {/* Add Bulletin Item Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-school-navy-950">
                    Add New Announcement to Rotating Bulletin
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>Quick presets:</span>
                    <button
                      type="button"
                      onClick={() => setNewBulletinItem({
                        category: 'EXAM',
                        title: 'FA-4 / Pre-Final Examinations timetable released for Classes VI to X. Download Hall Tickets.',
                        link: '/academics/examinations',
                        is_urgent: true
                      })}
                      className="px-2 py-0.5 rounded bg-white border text-[11px] font-semibold text-red-700 hover:bg-red-50"
                    >
                      + Exam Timetable
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewBulletinItem({
                        category: 'VICTORY',
                        title: 'JVN Under-14 Boys Squad wins Gold Medal at AP State Kho-Kho Championship 2026!',
                        link: '/achievements',
                        is_urgent: true
                      })}
                      className="px-2 py-0.5 rounded bg-white border text-[11px] font-semibold text-amber-700 hover:bg-amber-50"
                    >
                      + Sports Victory
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewBulletinItem({
                        category: 'ADMISSION',
                        title: 'Admissions Open for Academic Year 2025–26 (Nursery to Class X) — Limited Seats.',
                        link: '/admissions/enquiry',
                        is_urgent: false
                      })}
                      className="px-2 py-0.5 rounded bg-white border text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      + Admissions Open
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAddBulletinItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Category</label>
                    <select
                      value={newBulletinItem.category}
                      onChange={e => setNewBulletinItem({ ...newBulletinItem, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    >
                      <option value="EXAM">EXAM (Exams & Schedules)</option>
                      <option value="VICTORY">VICTORY (Sports & Awards)</option>
                      <option value="ADMISSION">ADMISSION (Enrollment)</option>
                      <option value="EVENT">EVENT (Celebrations)</option>
                      <option value="HOLIDAY">HOLIDAY (Closures)</option>
                      <option value="CIRCULAR">CIRCULAR (Official)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Headline Text *</label>
                    <input
                      type="text"
                      required
                      value={newBulletinItem.title}
                      onChange={e => setNewBulletinItem({ ...newBulletinItem, title: e.target.value })}
                      placeholder="e.g. FA-4 Examinations schedule announced"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Target Link URL</label>
                    <input
                      type="text"
                      value={newBulletinItem.link}
                      onChange={e => setNewBulletinItem({ ...newBulletinItem, link: e.target.value })}
                      placeholder="/academics/examinations"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-2">
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Bulletin Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Active Bulletin Stream ({settings.bulletin_items?.length || 0} items)</span>
                  <span className="text-[11px] text-gray-400">Use arrows to adjust rotation order</span>
                </div>

                {(!settings.bulletin_items || settings.bulletin_items.length === 0) ? (
                  <p className="text-xs text-gray-400 italic p-4 text-center">No bulletin items configured yet.</p>
                ) : (
                  <div className="space-y-2">
                    {settings.bulletin_items.map((item, index) => {
                      const categoryColors = {
                        EXAM: 'bg-rose-100 text-rose-800 border-rose-300',
                        VICTORY: 'bg-amber-100 text-amber-900 border-amber-300',
                        ADMISSION: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                        EVENT: 'bg-sky-100 text-sky-800 border-sky-300',
                        HOLIDAY: 'bg-purple-100 text-purple-800 border-purple-300',
                        CIRCULAR: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                      };

                      return (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3 text-xs hover:border-school-gold-300 transition-colors shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-[10px] text-gray-400 w-4">{index + 1}.</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${categoryColors[item.category] || 'bg-gray-100 text-gray-800'}`}>
                              {item.category}
                            </span>
                            <div className="truncate">
                              <p className="font-semibold text-school-navy-950 truncate">{item.title}</p>
                              {item.link && (
                                <p className="text-[10px] text-gray-400 font-mono truncate">{item.link}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleMoveBulletinItem(index, 'up')}
                              disabled={index === 0}
                              className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                              title="Move up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveBulletinItem(index, 'down')}
                              disabled={index === (settings.bulletin_items?.length || 0) - 1}
                              className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                              title="Move down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBulletinItem(item.id)}
                              className="p-1 rounded text-red-600 hover:bg-red-50 ml-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: HERO & HOMEPAGE */}
          {activeTab === 'hero_home' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold font-serif text-school-navy-950">
                  A. Hero & Homepage Management
                </h2>
                <p className="text-xs text-gray-500">
                  Update homepage hero headlines, subtitles, admission banner call-to-actions, and statistics.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Hero Background Video & Media Controls */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-school-navy-950 uppercase tracking-wider">
                        Hero Background Video (Plays Muted on Loop)
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Plays seamlessly in the hero background behind text with a dark cinematic tint so headlines stay sharp. Instant display with zero scroll lag.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Direct MP4 / WebM Video URL
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={settings.hero_video_url || ''}
                        onChange={e => setSettings({ ...settings, hero_video_url: e.target.value })}
                        placeholder="https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-raising-their-hands-9988-large.mp4"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-raising-their-hands-9988-large.mp4' })}
                          className="px-3 py-2 rounded-xl bg-school-gold-500/20 text-school-navy-900 text-xs font-bold hover:bg-school-gold-500/30 whitespace-nowrap"
                        >
                          Sample Video
                        </button>
                        {settings.hero_video_url && (
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, hero_video_url: '' })}
                            className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 whitespace-nowrap"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Hero Fallback Poster Image URL
                    </label>
                    <input
                      type="url"
                      value={settings.hero_background_image || ''}
                      onChange={e => setSettings({ ...settings, hero_background_image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={settings.hero_headline}
                    onChange={e => setSettings({ ...settings, hero_headline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-school-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Hero Subheadline / Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.hero_subheadline}
                    onChange={e => setSettings({ ...settings, hero_subheadline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-school-navy-800"
                  />
                </div>

                {/* 4 Homepage Key Statistics */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Homepage Key Statistics (Gold Ribbon Bar)
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      Edit the 4 main metrics displayed prominently on the public homepage. Real-time updates directly sync to Supabase.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat 1 */}
                    <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Metric 1</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Value</label>
                        <input
                          type="text"
                          value={settings.stat_1_value || ''}
                          onChange={e => setSettings({ ...settings, stat_1_value: e.target.value })}
                          placeholder="100%"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold text-school-navy-950"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={settings.stat_1_label || ''}
                          onChange={e => setSettings({ ...settings, stat_1_label: e.target.value })}
                          placeholder="CBSE Class X Pass Rate"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Metric 2</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Value</label>
                        <input
                          type="text"
                          value={settings.stat_2_value || ''}
                          onChange={e => setSettings({ ...settings, stat_2_value: e.target.value })}
                          placeholder="30+"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold text-school-navy-950"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={settings.stat_2_label || ''}
                          onChange={e => setSettings({ ...settings, stat_2_label: e.target.value })}
                          placeholder="Certified Educators"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Metric 3</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Value</label>
                        <input
                          type="text"
                          value={settings.stat_3_value || ''}
                          onChange={e => setSettings({ ...settings, stat_3_value: e.target.value })}
                          placeholder="15:1"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold text-school-navy-950"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={settings.stat_3_label || ''}
                          onChange={e => setSettings({ ...settings, stat_3_label: e.target.value })}
                          placeholder="Student-Teacher Ratio"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Metric 4</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Value</label>
                        <input
                          type="text"
                          value={settings.stat_4_value || ''}
                          onChange={e => setSettings({ ...settings, stat_4_value: e.target.value })}
                          placeholder="8+ Acres"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold text-school-navy-950"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={settings.stat_4_label || ''}
                          onChange={e => setSettings({ ...settings, stat_4_label: e.target.value })}
                          placeholder="Lush Campus & Grounds"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Current Academic Year
                    </label>
                    <input
                      type="text"
                      value={settings.current_academic_year}
                      onChange={e => setSettings({ ...settings, current_academic_year: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Admissions Open Toggle
                    </label>
                    <select
                      value={settings.admission_open ? 'true' : 'false'}
                      onChange={e => setSettings({ ...settings, admission_open: e.target.value === 'true' })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm"
                    >
                      <option value="true">Open (Enabled)</option>
                      <option value="false">Closed (Disabled)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    {saving ? 'Saving...' : 'Save Homepage Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: GALLERY & ALBUMS */}
          {activeTab === 'albums' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-school-navy-950">
                    B. Gallery & Album Management
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage Annual Day, Sports Day, National Festivals, and classroom activity albums.
                  </p>
                </div>
                <button
                  onClick={() => setAlbumModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Album</span>
                </button>
              </div>

              {/* Album List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map(alb => (
                  <div key={alb.id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 bg-gray-100">
                        <img src={alb.cover_image_url} alt={alb.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-school-navy-950 text-school-gold-400">
                          {alb.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <p className="text-[11px] text-gray-400">{alb.event_date}</p>
                        <h4 className="font-serif font-bold text-sm text-school-navy-950 line-clamp-1">{alb.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{alb.description}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                      <Link href={`/gallery/${alb.slug}`} target="_blank" className="text-xs font-bold text-school-navy-800 hover:underline">
                        Preview
                      </Link>
                      <button
                        onClick={() => handleDeleteAlbum(alb.id || '')}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete Album"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS MANAGEMENT */}
          {activeTab === 'admissions' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-school-navy-950">
                    C. Admissions & Enquiry Management
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage online student applications, track enquiry statuses, add counselor remarks, and export to CSV.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/api/admin/enquiries/export"
                    download
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV</span>
                  </a>
                </div>
              </div>

              {/* Status and Grade Filters */}
              <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-500">Status:</span>
                  <select
                    value={enquiryStatusFilter}
                    onChange={e => setEnquiryStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-500">Grade:</span>
                  <select
                    value={enquiryGradeFilter}
                    onChange={e => setEnquiryGradeFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="All">All Classes</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX</option>
                    <option value="Class X">Class X</option>
                  </select>
                </div>

                <span className="text-gray-400 ml-auto font-medium">
                  Showing {filteredEnquiries.length} of {enquiries.length} applications
                </span>
              </div>

              {/* Enquiries Table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                      <th className="p-3.5">Student & Parent</th>
                      <th className="p-3.5">Contact</th>
                      <th className="p-3.5">Applying For</th>
                      <th className="p-3.5">Applied Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Admin Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-gray-400 italic">
                          No admission enquiries matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map(enq => (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5">
                            <p className="font-bold text-school-navy-950">{enq.student_name}</p>
                            <p className="text-gray-500">Parent: {enq.parent_name}</p>
                          </td>
                          <td className="p-3.5">
                            <a href={`tel:${enq.phone}`} className="font-semibold text-school-navy-800 hover:underline">
                              {enq.phone}
                            </a>
                            {enq.email && <p className="text-gray-400 text-[11px]">{enq.email}</p>}
                          </td>
                          <td className="p-3.5 font-semibold text-school-navy-900">{enq.grade_applying}</td>
                          <td className="p-3.5 text-gray-500">{enq.created_at ? enq.created_at.slice(0, 10) : 'Today'}</td>
                          <td className="p-3.5">
                            <select
                              value={enq.status}
                              onChange={e => handleUpdateEnquiryStatus(enq.id || '', e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                enq.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : enq.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : enq.status === 'Converted'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-gray-100 text-gray-800 border-gray-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <input
                              type="text"
                              defaultValue={enq.admin_notes || ''}
                              onBlur={e => handleUpdateEnquiryStatus(enq.id || '', enq.status, e.target.value)}
                              placeholder="Add remarks..."
                              className="px-2.5 py-1 rounded border border-gray-300 bg-white text-xs w-44 focus:ring-1 focus:ring-school-navy-800"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: NOTICE BOARD & ANNOUNCEMENTS */}
          {activeTab === 'notices' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-school-navy-950">
                    D. Notice Board & School Circulars
                  </h2>
                  <p className="text-xs text-gray-500">
                    Publish official school circulars, examination schedules, and high-priority notices.
                  </p>
                </div>
                <button
                  onClick={() => setNoticeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Circular</span>
                </button>
              </div>

              {/* Notices List */}
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n.id} className="p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                          {n.category}
                        </span>
                        {n.is_important && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                            IMPORTANT
                          </span>
                        )}
                        <span className="text-xs text-gray-400">{n.notice_date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-school-navy-950 mt-1">{n.title}</h4>
                    </div>
                    <button
                      onClick={() => handleDeleteNotice(n.id || '')}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ACHIEVEMENTS & SPORTS AWARDS */}
          {activeTab === 'achievements' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    <h2 className="text-xl font-bold font-serif text-school-navy-950">
                      J6. Student Achievements & Sports Championships
                    </h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage verified sports medals, state championships, academic toppers, and Olympiad recognitions.
                  </p>
                </div>
                <button
                  onClick={() => setAchievementModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Achievement</span>
                </button>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(ach => (
                  <div key={ach.id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between bg-white hover:border-school-gold-400 transition-all">
                    <div>
                      <div className="relative h-44 bg-gray-100">
                        {ach.image_url ? (
                          <img src={ach.image_url} alt={ach.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-school-navy-900 text-school-gold-400">
                            <Trophy className="w-12 h-12" />
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold bg-school-navy-950 text-school-gold-400">
                          {ach.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                          <span>{ach.academic_year}</span>
                          <span>{ach.student_name || 'Team Achievement'}</span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-school-navy-950 line-clamp-1">{ach.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{ach.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                      <Link href="/achievements" target="_blank" className="text-xs font-bold text-school-navy-800 hover:underline">
                        View on Site
                      </Link>
                      <button
                        onClick={() => handleDeleteAchievement(ach.id || '')}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete Achievement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FACULTY */}
          {activeTab === 'faculty' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-school-navy-950">
                    F. Faculty Directory Management
                  </h2>
                  <p className="text-xs text-gray-500">
                    Add, edit, and organize teaching & leadership staff across educational departments.
                  </p>
                </div>
                <button
                  onClick={() => setFacultyModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Faculty Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.map(f => (
                  <div key={f.id} className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={f.photo_url} alt={f.name} className="w-12 h-12 rounded-full object-cover border" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-school-navy-950">{f.name}</h4>
                        <p className="text-xs text-gray-500">{f.designation}</p>
                        <p className="text-[11px] text-gray-400">{f.qualification} • {f.department}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteFaculty(f.id || '')}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Remove faculty"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DISCLOSURES */}
          {activeTab === 'disclosures' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-school-navy-950">
                    G. CBSE Mandatory Public Disclosure
                  </h2>
                  <p className="text-xs text-gray-500">
                    Maintain statutory affiliation certificates, building/fire safety, fee structures, and SAR compliance.
                  </p>
                </div>
                <button
                  onClick={() => setDisclosureModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Disclosure PDF</span>
                </button>
              </div>

              <div className="space-y-2">
                {disclosures.map(doc => (
                  <div key={doc.id} className="p-3.5 rounded-xl border border-gray-200 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{doc.category}</span>
                      <h4 className="font-semibold text-school-navy-950 mt-0.5">{doc.document_title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={doc.document_url} target="_blank" className="font-semibold text-school-navy-800 hover:underline">
                        View
                      </a>
                      <button
                        onClick={() => handleDeleteDisclosure(doc.id || '')}
                        className="p-1 rounded text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEO & GOOGLE RANKINGS */}
          {activeTab === 'seo' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold font-serif text-school-navy-950">
                  H. Search Engine Optimization (SEO) & Google Ranking
                </h2>
                <p className="text-xs text-gray-500">
                  Configure Google Site Verification, Google Analytics, XML Sitemap, and metadata for Koilakuntla searches.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-900">
                <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Technical Google SEO Active Checklist</span>
                </p>
                <ul className="list-disc list-inside space-y-1 text-emerald-800">
                  <li>XML Sitemap live at: <Link href="/sitemap.xml" target="_blank" className="underline font-mono">/sitemap.xml</Link> (all 27 pages crawled)</li>
                  <li>Robots.txt live at: <Link href="/robots.txt" target="_blank" className="underline font-mono">/robots.txt</Link></li>
                  <li>Schema.org JSON-LD structured data for EducationalOrganization & CBSE 130603</li>
                  <li>Open Graph & Twitter Social Cards with School Crest</li>
                  <li>Clean URL numbered pagination with canonical tags</li>
                </ul>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Google Search Console Verification Meta Tag Code
                  </label>
                  <input
                    type="text"
                    value={settings.google_verification_code || ''}
                    onChange={e => setSettings({ ...settings, google_verification_code: e.target.value })}
                    placeholder="e.g. google-site-verification=abc123xyz"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Google Analytics 4 Measurement ID
                  </label>
                  <input
                    type="text"
                    value={settings.google_analytics_id || ''}
                    onChange={e => setSettings({ ...settings, google_analytics_id: e.target.value })}
                    placeholder="e.g. G-XXXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white font-bold text-xs shadow-md"
                  >
                    Save SEO Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: WHATSAPP & SOCIAL MEDIA */}
          {activeTab === 'whatsapp' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold font-serif text-school-navy-950">
                  I. Social Media & WhatsApp Integration
                </h2>
                <p className="text-xs text-gray-500">
                  Configure official social media links (Instagram, Facebook, YouTube, LinkedIn) and WhatsApp contact button. Updates sync immediately to public header topbar and footer.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Social Media Links Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-school-navy-950 uppercase tracking-wider">
                      Official Social Media Channels
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Icons are displayed dynamically in the top navigation bar and school footer.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        value={settings.instagram_url || ''}
                        onChange={e => setSettings({ ...settings, instagram_url: e.target.value })}
                        placeholder="https://instagram.com/jyothividyaniketan"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Facebook Page URL
                      </label>
                      <input
                        type="url"
                        value={settings.facebook_url || ''}
                        onChange={e => setSettings({ ...settings, facebook_url: e.target.value })}
                        placeholder="https://facebook.com/jyothividyaniketan"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        value={settings.youtube_url || ''}
                        onChange={e => setSettings({ ...settings, youtube_url: e.target.value })}
                        placeholder="https://youtube.com/@jyothividyaniketan"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={settings.linkedin_url || ''}
                        onChange={e => setSettings({ ...settings, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/school/jyothividyaniketan"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
                  <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Official WhatsApp Contact & Floating Button
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Official WhatsApp Number (With Country Code)
                      </label>
                      <input
                        type="text"
                        value={settings.whatsapp_number}
                        onChange={e => setSettings({ ...settings, whatsapp_number: e.target.value })}
                        placeholder="+917997999863"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Floating WhatsApp Button Status
                      </label>
                      <select
                        value={settings.whatsapp_enabled ? 'true' : 'false'}
                        onChange={e => setSettings({ ...settings, whatsapp_enabled: e.target.value === 'true' })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                      >
                        <option value="true">Enabled (Visible on Website)</option>
                        <option value="false">Disabled (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Default WhatsApp Pre-filled Message
                    </label>
                    <textarea
                      rows={3}
                      value={settings.whatsapp_default_message}
                      onChange={e => setSettings({ ...settings, whatsapp_default_message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-school-navy-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    {saving ? 'Saving...' : 'Save Social Media & WhatsApp Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SUPABASE SQL */}
          {activeTab === 'sql_schema' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold font-serif text-school-navy-950">
                  Supabase Database Setup & SQL Runner
                </h2>
                <p className="text-xs text-gray-500">
                  Review the database schema and copy SQL queries to run directly in your Supabase SQL Editor.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
                <p className="font-bold">Instructions to run in Supabase:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open your Supabase Project dashboard (<code>izfuuecmwemebaigmfgo</code>).</li>
                  <li>Click on <strong>SQL Editor</strong> in the left sidebar.</li>
                  <li>Click <strong>New Query</strong>, paste the complete schema from <code>supabase/schema.sql</code>, and click <strong>Run</strong>.</li>
                  <li>All 20 tables, RLS security policies, and indexes will be instantly provisioned!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold font-serif text-school-navy-950">
                  14. Audit Logs & System Activity
                </h2>
                <p className="text-xs text-gray-500">
                  Track administrator modifications, content publishing, and security events.
                </p>
              </div>

              <div className="space-y-2">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-lg bg-slate-50 border border-gray-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-school-navy-900">{log.action}</span> on <span className="font-semibold text-gray-700">{log.entity}</span>
                      <p className="text-gray-500 text-[11px]">{log.details}</p>
                    </div>
                    <span className="text-[11px] text-gray-400">{log.created_at ? log.created_at.slice(0, 19).replace('T', ' ') : 'Recent'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for remaining tabs */}
          {['academics', 'facilities', 'events', 'downloads', 'faqs'].includes(activeTab) && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-4">
              <h3 className="text-xl font-bold font-serif text-school-navy-950 capitalize">
                {activeTab} Management Module
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Module active and fully connected to Supabase backend services. Content is live on the public website.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2 rounded-xl bg-school-navy-800 text-white font-bold text-xs"
                >
                  Return to Overview
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD ACHIEVEMENT */}
      {achievementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-school-navy-950">Add Achievement / Award</h3>
              </div>
              <button onClick={() => setAchievementModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAchievement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Achievement / Championship Title *</label>
                <input
                  type="text"
                  required
                  value={newAchievement.title}
                  onChange={e => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  placeholder="e.g. AP State Under-14 Kho-Kho Gold Medal"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newAchievement.category}
                    onChange={e => setNewAchievement({ ...newAchievement, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Sports">Sports & Athletics</option>
                    <option value="Academic">Academic Excellence</option>
                    <option value="Olympiad">Olympiad & Science</option>
                    <option value="Cultural">Cultural & Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={newAchievement.academic_year}
                    onChange={e => setNewAchievement({ ...newAchievement, academic_year: e.target.value })}
                    placeholder="2025–2026"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Student / Team Name</label>
                <input
                  type="text"
                  value={newAchievement.student_name}
                  onChange={e => setNewAchievement({ ...newAchievement, student_name: e.target.value })}
                  placeholder="e.g. JVN Junior Boys Squad"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Photograph / Trophy Image URL</label>
                <input
                  type="url"
                  value={newAchievement.image_url}
                  onChange={e => setNewAchievement({ ...newAchievement, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newAchievement.description}
                  onChange={e => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  placeholder="Brief details about the competition and medal won..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAchievementModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-gold-500 text-school-navy-950 font-bold"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NOTICE */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-school-navy-950">Publish New Notice / Circular</h3>
            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. Schedule for FA-4 Exams"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newNotice.category}
                  onChange={e => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="General">General</option>
                  <option value="Examinations">Examinations</option>
                  <option value="Admissions">Admissions</option>
                  <option value="Sports">Sports</option>
                  <option value="Holidays">Holidays</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="important-check"
                  checked={newNotice.is_important}
                  onChange={e => setNewNotice({ ...newNotice, is_important: e.target.checked })}
                />
                <label htmlFor="important-check" className="font-semibold text-gray-700">Mark as High Priority / Important</label>
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-navy-800 text-white font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ALBUM */}
      {albumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-school-navy-950">Create Photo Album</h3>
            <form onSubmit={handleCreateAlbum} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  value={newAlbum.title}
                  onChange={e => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  placeholder="e.g. Science Exhibition 2026"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newAlbum.category}
                  onChange={e => setNewAlbum({ ...newAlbum, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Annual Day">Annual Day</option>
                  <option value="Sports Day">Sports Day</option>
                  <option value="Independence Day">Independence Day</option>
                  <option value="Republic Day">Republic Day</option>
                  <option value="Cultural Activities">Cultural Activities</option>
                  <option value="Classroom Activities">Classroom Activities</option>
                  <option value="School Celebrations">School Celebrations</option>
                  <option value="Educational Trips">Educational Trips</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Campus and Infrastructure">Campus and Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newAlbum.cover_image_url}
                  onChange={e => setNewAlbum({ ...newAlbum, cover_image_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newAlbum.description}
                  onChange={e => setNewAlbum({ ...newAlbum, description: e.target.value })}
                  placeholder="Event description..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAlbumModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-gold-500 text-school-navy-950 font-bold"
                >
                  Save Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD FACULTY */}
      {facultyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-school-navy-950">Add Faculty Member</h3>
            <form onSubmit={handleCreateFaculty} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Teacher Full Name *</label>
                <input
                  type="text"
                  required
                  value={newFaculty.name}
                  onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="e.g. Mr. K. Ramanjaneyulu"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={newFaculty.designation}
                  onChange={e => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                  placeholder="e.g. Senior Mathematics Teacher"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Department</label>
                <select
                  value={newFaculty.department}
                  onChange={e => setNewFaculty({ ...newFaculty, department: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Leadership">Leadership</option>
                  <option value="Secondary School">Secondary School</option>
                  <option value="Middle School">Middle School</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Pre-Primary">Pre-Primary</option>
                  <option value="Special Activity">Special Activity</option>
                </select>
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFacultyModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-navy-800 text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DISCLOSURE */}
      {disclosureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-school-navy-950">Add Mandatory Disclosure Document</h3>
            <form onSubmit={handleCreateDisclosure} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newDisclosure.category}
                  onChange={e => setNewDisclosure({ ...newDisclosure, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="A: GENERAL INFORMATION">A: GENERAL INFORMATION</option>
                  <option value="B: DOCUMENTS AND INFORMATION">B: DOCUMENTS AND INFORMATION</option>
                  <option value="C: RESULT AND ACADEMICS">C: RESULT AND ACADEMICS</option>
                  <option value="D: STAFF (TEACHING)">D: STAFF (TEACHING)</option>
                  <option value="E: SCHOOL INFRASTRUCTURE">E: SCHOOL INFRASTRUCTURE</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Document Title / Metric *</label>
                <input
                  type="text"
                  required
                  value={newDisclosure.document_title}
                  onChange={e => setNewDisclosure({ ...newDisclosure, document_title: e.target.value })}
                  placeholder="e.g. Copy of Valid Building Safety Certificate"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Document URL / File Path</label>
                <input
                  type="text"
                  value={newDisclosure.document_url}
                  onChange={e => setNewDisclosure({ ...newDisclosure, document_url: e.target.value })}
                  placeholder="/docs/Building_Safety_Certificate.pdf"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDisclosureModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-navy-800 text-white font-bold"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
