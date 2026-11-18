import { supabase } from '@/lib/supabase/client';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  SiteSettings,
  HomepageSection,
  PageSEO,
  NavItem,
  Announcement,
  AdmissionEnquiry,
  AcademicCalendarItem,
  ExaminationUpdate,
  FacultyMember,
  GalleryAlbum,
  GalleryVideo,
  EventItem,
  NoticeItem,
  AchievementItem,
  TestimonialItem,
  DisclosureDocument,
  DownloadItem,
  FAQItem,
  AuditLog,
  PaginationResult
} from '@/types';
import {
  defaultSiteSettings,
  defaultHomepageSections,
  defaultNavigation,
  defaultAnnouncements,
  defaultAlbums,
  defaultVideos,
  defaultEvents,
  defaultNotices,
  defaultFaculty,
  defaultAchievements,
  defaultTestimonials,
  defaultDisclosures,
  defaultDownloads,
  defaultFAQs,
  defaultCalendars,
  defaultExams,
  defaultEnquiries
} from './default-data';

// Helper for local mock fallback storage in memory during development/fallback
let memoryEnquiries: AdmissionEnquiry[] = [...defaultEnquiries];
let memorySettings: SiteSettings = { ...defaultSiteSettings };
let memoryAlbums: GalleryAlbum[] = [...defaultAlbums];
let memoryNotices: NoticeItem[] = [...defaultNotices];
let memoryEvents: EventItem[] = [...defaultEvents];
let memoryFaculty: FacultyMember[] = [...defaultFaculty];
let memoryAchievements: AchievementItem[] = [...defaultAchievements];
let memoryDisclosures: DisclosureDocument[] = [...defaultDisclosures];
let memoryDownloads: DownloadItem[] = [...defaultDownloads];
let memoryFAQs: FAQItem[] = [...defaultFAQs];
let memoryAnnouncements: Announcement[] = [...defaultAnnouncements];
let memoryCalendars: AcademicCalendarItem[] = [...defaultCalendars];
let memoryExams: ExaminationUpdate[] = [...defaultExams];
let memoryAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    actor: 'System Admin',
    action: 'INIT',
    entity: 'system',
    details: 'System initialized with official school CBSE 130603 configuration',
    created_at: new Date().toISOString()
  }
];

export const dataService = {
  // 1. SITE SETTINGS (STRICT SUPABASE BACKEND)
  async getSiteSettings(): Promise<SiteSettings> {
    try {
      const [settingsRes, heroRes] = await Promise.all([
        supabaseAdmin.from('site_settings').select('*').limit(1).single(),
        supabaseAdmin.from('homepage_sections').select('*').eq('section_key', 'hero').single(),
      ]);

      let merged: SiteSettings = {
        ...defaultSiteSettings,
        ...(settingsRes.data || {}),
      };

      if (heroRes.data) {
        if (heroRes.data.video_url) merged.hero_video_url = heroRes.data.video_url;
        if (heroRes.data.image_url) merged.hero_background_image = heroRes.data.image_url;
        if (heroRes.data.meta_json) {
          const meta = heroRes.data.meta_json;
          if (meta.facebook_url !== undefined) merged.facebook_url = meta.facebook_url;
          if (meta.instagram_url !== undefined) merged.instagram_url = meta.instagram_url;
          if (meta.youtube_url !== undefined) merged.youtube_url = meta.youtube_url;
          if (meta.linkedin_url !== undefined) merged.linkedin_url = meta.linkedin_url;
          if (meta.bulletin_items) merged.bulletin_items = meta.bulletin_items;
          if (meta.popup_image_url) merged.popup_image_url = meta.popup_image_url;
          if (meta.popup_badge) merged.popup_badge = meta.popup_badge;
          if (meta.popup_cta_text) merged.popup_cta_text = meta.popup_cta_text;
          if (meta.stat_1_value) merged.stat_1_value = meta.stat_1_value;
          if (meta.stat_1_label) merged.stat_1_label = meta.stat_1_label;
          if (meta.stat_2_value) merged.stat_2_value = meta.stat_2_value;
          if (meta.stat_2_label) merged.stat_2_label = meta.stat_2_label;
          if (meta.stat_3_value) merged.stat_3_value = meta.stat_3_value;
          if (meta.stat_3_label) merged.stat_3_label = meta.stat_3_label;
          if (meta.stat_4_value) merged.stat_4_value = meta.stat_4_value;
          if (meta.stat_4_label) merged.stat_4_label = meta.stat_4_label;
        }
      }
      memorySettings = merged;
      return merged;
    } catch (e) {
      console.error('Error fetching site_settings from Supabase:', e);
    }
    return memorySettings;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      // 1. Update native columns in site_settings table
      const siteSettingsPayload: Record<string, any> = {
        school_name: settings.school_name,
        tagline: settings.tagline,
        affiliation_number: settings.affiliation_number,
        school_code: settings.school_code,
        trust_name: settings.trust_name,
        established_year: settings.established_year,
        primary_phone: settings.primary_phone,
        secondary_phone: settings.secondary_phone,
        primary_email: settings.primary_email,
        secondary_email: settings.secondary_email,
        address: settings.address,
        google_maps_url: settings.google_maps_url,
        whatsapp_number: settings.whatsapp_number,
        whatsapp_enabled: settings.whatsapp_enabled,
        whatsapp_default_message: settings.whatsapp_default_message,
        logo_url: settings.logo_url,
        favicon_url: settings.favicon_url,
        current_academic_year: settings.current_academic_year,
        admission_open: settings.admission_open,
        ticker_enabled: settings.ticker_enabled,
        ticker_text: settings.ticker_text,
        popup_enabled: settings.popup_enabled,
        popup_title: settings.popup_title,
        popup_message: settings.popup_message,
        popup_link: settings.popup_link,
        google_verification_code: settings.google_verification_code,
        google_analytics_id: settings.google_analytics_id,
        hero_headline: settings.hero_headline,
        hero_subheadline: settings.hero_subheadline,
        updated_at: new Date().toISOString(),
      };
      Object.keys(siteSettingsPayload).forEach(k => siteSettingsPayload[k] === undefined && delete siteSettingsPayload[k]);

      // Find the ID of site_settings row
      const { data: existingRows } = await supabaseAdmin.from('site_settings').select('id').limit(1);
      const rowId = existingRows?.[0]?.id || settings.id || '4778e423-1b1b-4ea2-af0d-f9545e58249e';

      // Attempt to save extended columns to site_settings (if columns exist)
      const extendedPayload = {
        ...siteSettingsPayload,
        hero_video_url: settings.hero_video_url,
        hero_background_image: settings.hero_background_image,
        facebook_url: settings.facebook_url,
        instagram_url: settings.instagram_url,
        youtube_url: settings.youtube_url,
        linkedin_url: settings.linkedin_url,
        popup_image_url: settings.popup_image_url,
        popup_badge: settings.popup_badge,
        popup_cta_text: settings.popup_cta_text,
        bulletin_items: settings.bulletin_items,
        stat_1_value: settings.stat_1_value,
        stat_1_label: settings.stat_1_label,
        stat_2_value: settings.stat_2_value,
        stat_2_label: settings.stat_2_label,
        stat_3_value: settings.stat_3_value,
        stat_3_label: settings.stat_3_label,
        stat_4_value: settings.stat_4_value,
        stat_4_label: settings.stat_4_label,
      };
      Object.keys(extendedPayload).forEach(k => (extendedPayload as any)[k] === undefined && delete (extendedPayload as any)[k]);

      const { error: extError } = await supabaseAdmin.from('site_settings').update(extendedPayload).eq('id', rowId);
      if (extError) {
        // Fallback to core columns if custom columns haven't been added yet
        await supabaseAdmin.from('site_settings').update(siteSettingsPayload).eq('id', rowId);
      }

      // 2. Update hero background video, stats, and social metadata in homepage_sections (section_key = 'hero')
      const metaJson: Record<string, any> = {
        facebook_url: settings.facebook_url,
        instagram_url: settings.instagram_url,
        youtube_url: settings.youtube_url,
        linkedin_url: settings.linkedin_url,
        popup_image_url: settings.popup_image_url,
        popup_badge: settings.popup_badge,
        popup_cta_text: settings.popup_cta_text,
        bulletin_items: settings.bulletin_items,
        stat_1_value: settings.stat_1_value,
        stat_1_label: settings.stat_1_label,
        stat_2_value: settings.stat_2_value,
        stat_2_label: settings.stat_2_label,
        stat_3_value: settings.stat_3_value,
        stat_3_label: settings.stat_3_label,
        stat_4_value: settings.stat_4_value,
        stat_4_label: settings.stat_4_label,
      };

      await supabaseAdmin.from('homepage_sections').update({
        video_url: settings.hero_video_url || null,
        image_url: settings.hero_background_image || null,
        title: settings.hero_headline || undefined,
        content: settings.hero_subheadline || undefined,
        meta_json: metaJson,
        updated_at: new Date().toISOString(),
      }).eq('section_key', 'hero');

      await this.logAudit('UPDATE', 'site_settings', rowId, 'Updated website configuration directly in Supabase');
      return await this.getSiteSettings();
    } catch (e) {
      console.error('Error updating site_settings in Supabase:', e);
    }
    memorySettings = { ...memorySettings, ...settings, updated_at: new Date().toISOString() };
    return memorySettings;
  },

  // 2. HOMEPAGE SECTIONS
  async getHomepageSections(): Promise<HomepageSection[]> {
    try {
      const { data, error } = await supabase.from('homepage_sections').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return defaultHomepageSections;
  },

  // 3. NAVIGATION
  async getNavigation(): Promise<NavItem[]> {
    try {
      const { data, error } = await supabase.from('navigation_items').select('*').order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return defaultNavigation;
  },

  // 4. ANNOUNCEMENTS
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .order('publish_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryAnnouncements.filter(a => a.is_published);
  },

  async getAllAnnouncements(): Promise<Announcement[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('announcements')
        .select('*')
        .order('publish_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryAnnouncements;
  },

  async saveAnnouncement(item: Partial<Announcement>): Promise<Announcement> {
    try {
      const { data, error } = await supabaseAdmin.from('announcements').upsert(item).select().single();
      if (!error && data) {
        const idx = memoryAnnouncements.findIndex(a => a.id === data.id);
        if (idx >= 0) memoryAnnouncements[idx] = data;
        else memoryAnnouncements.unshift(data);
        await this.logAudit('SAVE', 'announcements', data.id, `Saved announcement: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newItem: Announcement = {
      id: item.id || `ann-${Date.now()}`,
      title: item.title || 'Untitled',
      summary: item.summary || '',
      content: item.content || '',
      category: item.category || 'General',
      attachment_url: item.attachment_url,
      is_ticker: !!item.is_ticker,
      is_popup: !!item.is_popup,
      is_pinned: !!item.is_pinned,
      is_published: item.is_published ?? true,
      publish_at: item.publish_at || new Date().toISOString(),
      expires_at: item.expires_at || null,
      created_at: new Date().toISOString(),
    };
    const idx = memoryAnnouncements.findIndex(a => a.id === newItem.id);
    if (idx >= 0) memoryAnnouncements[idx] = newItem;
    else memoryAnnouncements.unshift(newItem);
    await this.logAudit('SAVE', 'announcements', newItem.id, `Saved announcement: ${newItem.title}`);
    return newItem;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('announcements').delete().eq('id', id);
    } catch (e) {}
    memoryAnnouncements = memoryAnnouncements.filter(a => a.id !== id);
    await this.logAudit('DELETE', 'announcements', id, 'Deleted announcement');
    return true;
  },

  // 5. GALLERY ALBUMS (WITH PROFESSIONAL NUMBERED PAGINATION)
  async getAlbums(page: number = 1, pageSize: number = 6, category?: string): Promise<PaginationResult<GalleryAlbum>> {
    try {
      let query = supabase.from('gallery_albums').select('*', { count: 'exact' }).eq('is_published', true);
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('sort_order', { ascending: true }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = memoryAlbums.filter(a => a.is_published);
    if (category && category !== 'All') {
      filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    return {
      data: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    try {
      const { data, error } = await supabase.from('gallery_albums').select('*, gallery_images(*)').eq('slug', slug).single();
      if (!error && data) {
        return {
          ...data,
          images: data.gallery_images || [],
        };
      }
    } catch (e) {}
    const found = memoryAlbums.find(a => a.slug === slug);
    return found || null;
  },

  async getAllAlbumsAdmin(): Promise<GalleryAlbum[]> {
    try {
      const { data, error } = await supabaseAdmin.from('gallery_albums').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return memoryAlbums;
  },

  async saveAlbum(album: Partial<GalleryAlbum>): Promise<GalleryAlbum> {
    try {
      const { data, error } = await supabaseAdmin.from('gallery_albums').upsert(album).select().single();
      if (!error && data) {
        const idx = memoryAlbums.findIndex(a => a.id === data.id);
        if (idx >= 0) memoryAlbums[idx] = data;
        else memoryAlbums.unshift(data);
        await this.logAudit('SAVE', 'gallery_albums', data.id, `Saved album: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newAlbum: GalleryAlbum = {
      id: album.id || `album-${Date.now()}`,
      slug: album.slug || (album.title ? album.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `album-${Date.now()}`),
      title: album.title || 'New Album',
      category: album.category || 'School Celebrations',
      description: album.description || '',
      event_date: album.event_date || new Date().toISOString().split('T')[0],
      cover_image_url: album.cover_image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
      is_featured: !!album.is_featured,
      is_published: album.is_published ?? true,
      sort_order: album.sort_order || 1,
      photo_count: album.photo_count || 0,
      images: album.images || [],
    };
    const idx = memoryAlbums.findIndex(a => a.id === newAlbum.id);
    if (idx >= 0) memoryAlbums[idx] = newAlbum;
    else memoryAlbums.unshift(newAlbum);
    await this.logAudit('SAVE', 'gallery_albums', newAlbum.id, `Saved album: ${newAlbum.title}`);
    return newAlbum;
  },

  async deleteAlbum(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('gallery_albums').delete().eq('id', id);
    } catch (e) {}
    memoryAlbums = memoryAlbums.filter(a => a.id !== id);
    await this.logAudit('DELETE', 'gallery_albums', id, 'Deleted album');
    return true;
  },

  // 6. ADMISSIONS & ENQUIRIES
  async submitAdmissionEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'status' | 'created_at'>): Promise<AdmissionEnquiry> {
    const payload = {
      ...enquiry,
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      const { data, error } = await supabase.from('admission_enquiries').insert([payload]).select().single();
      if (!error && data) {
        memoryEnquiries.unshift(data);
        return data;
      }
    } catch (e) {}
    const created: AdmissionEnquiry = {
      id: `enq-${Date.now()}`,
      ...payload,
      status: 'New',
    };
    memoryEnquiries.unshift(created);
    return created;
  },

  async getAdmissionEnquiries(
    page: number = 1,
    pageSize: number = 10,
    status?: string,
    grade?: string
  ): Promise<PaginationResult<AdmissionEnquiry>> {
    try {
      let query = supabaseAdmin.from('admission_enquiries').select('*', { count: 'exact' });
      if (status && status !== 'All') {
        query = query.eq('status', status);
      }
      if (grade && grade !== 'All') {
        query = query.eq('grade_applying', grade);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = [...memoryEnquiries];
    if (status && status !== 'All') {
      filtered = filtered.filter(e => e.status === status);
    }
    if (grade && grade !== 'All') {
      filtered = filtered.filter(e => e.grade_applying === grade);
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async updateEnquiryStatus(id: string, status: AdmissionEnquiry['status'], adminNotes?: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('admission_enquiries').update({
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } catch (e) {}
    const idx = memoryEnquiries.findIndex(e => e.id === id);
    if (idx >= 0) {
      memoryEnquiries[idx].status = status;
      if (adminNotes !== undefined) memoryEnquiries[idx].admin_notes = adminNotes;
    }
    await this.logAudit('UPDATE', 'admission_enquiries', id, `Updated enquiry status to ${status}`);
    return true;
  },

  // 7. NOTICES & CIRCULARS (PAGINATED)
  async getNotices(page: number = 1, pageSize: number = 10, category?: string): Promise<PaginationResult<NoticeItem>> {
    try {
      let query = supabase.from('notices').select('*', { count: 'exact' }).eq('is_published', true);
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('notice_date', { ascending: false }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = memoryNotices.filter(n => n.is_published);
    if (category && category !== 'All') {
      filtered = filtered.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getAllNoticesAdmin(): Promise<NoticeItem[]> {
    try {
      const { data, error } = await supabaseAdmin.from('notices').select('*').order('notice_date', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return memoryNotices;
  },

  async saveNotice(item: Partial<NoticeItem>): Promise<NoticeItem> {
    try {
      const { data, error } = await supabaseAdmin.from('notices').upsert(item).select().single();
      if (!error && data) {
        const idx = memoryNotices.findIndex(n => n.id === data.id);
        if (idx >= 0) memoryNotices[idx] = data;
        else memoryNotices.unshift(data);
        await this.logAudit('SAVE', 'notices', data.id, `Saved notice: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newNotice: NoticeItem = {
      id: item.id || `not-${Date.now()}`,
      title: item.title || 'Untitled Notice',
      circular_number: item.circular_number || `JVN/CIR/${Date.now().toString().slice(-4)}`,
      notice_date: item.notice_date || new Date().toISOString().split('T')[0],
      category: item.category || 'General',
      file_url: item.file_url || '/downloads',
      is_important: !!item.is_important,
      is_published: item.is_published ?? true,
      expires_at: item.expires_at || null,
      created_at: new Date().toISOString(),
    };
    const idx = memoryNotices.findIndex(n => n.id === newNotice.id);
    if (idx >= 0) memoryNotices[idx] = newNotice;
    else memoryNotices.unshift(newNotice);
    await this.logAudit('SAVE', 'notices', newNotice.id, `Saved notice: ${newNotice.title}`);
    return newNotice;
  },

  async deleteNotice(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('notices').delete().eq('id', id);
    } catch (e) {}
    memoryNotices = memoryNotices.filter(n => n.id !== id);
    await this.logAudit('DELETE', 'notices', id, 'Deleted notice');
    return true;
  },

  // 8. EVENTS (PAGINATED)
  async getEvents(page: number = 1, pageSize: number = 6, category?: string): Promise<PaginationResult<EventItem>> {
    try {
      let query = supabase.from('events').select('*', { count: 'exact' }).eq('is_published', true);
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('event_date', { ascending: false }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = memoryEvents.filter(e => e.is_published);
    if (category && category !== 'All') {
      filtered = filtered.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getAllEventsAdmin(): Promise<EventItem[]> {
    try {
      const { data, error } = await supabaseAdmin.from('events').select('*').order('event_date', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return memoryEvents;
  },

  async saveEvent(event: Partial<EventItem>): Promise<EventItem> {
    try {
      const { data, error } = await supabaseAdmin.from('events').upsert(event).select().single();
      if (!error && data) {
        const idx = memoryEvents.findIndex(e => e.id === data.id);
        if (idx >= 0) memoryEvents[idx] = data;
        else memoryEvents.unshift(data);
        await this.logAudit('SAVE', 'events', data.id, `Saved event: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newEvent: EventItem = {
      id: event.id || `ev-${Date.now()}`,
      slug: event.slug || (event.title ? event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `ev-${Date.now()}`),
      title: event.title || 'School Event',
      category: event.category || 'Celebration',
      event_date: event.event_date || new Date().toISOString().split('T')[0],
      venue: event.venue || 'School Campus, Koilakuntla',
      description: event.description || '',
      image_url: event.image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
      is_featured: !!event.is_featured,
      is_published: event.is_published ?? true,
      created_at: new Date().toISOString(),
    };
    const idx = memoryEvents.findIndex(e => e.id === newEvent.id);
    if (idx >= 0) memoryEvents[idx] = newEvent;
    else memoryEvents.unshift(newEvent);
    await this.logAudit('SAVE', 'events', newEvent.id, `Saved event: ${newEvent.title}`);
    return newEvent;
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('events').delete().eq('id', id);
    } catch (e) {}
    memoryEvents = memoryEvents.filter(e => e.id !== id);
    await this.logAudit('DELETE', 'events', id, 'Deleted event');
    return true;
  },

  // 9. FACULTY (PAGINATED & FILTERED)
  async getFaculty(page: number = 1, pageSize: number = 8, department?: string): Promise<PaginationResult<FacultyMember>> {
    try {
      let query = supabase.from('faculty').select('*', { count: 'exact' }).eq('is_active', true);
      if (department && department !== 'All') {
        query = query.eq('department', department);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('display_order', { ascending: true }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = memoryFaculty.filter(f => f.is_active);
    if (department && department !== 'All') {
      filtered = filtered.filter(f => f.department.toLowerCase() === department.toLowerCase());
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getAllFacultyAdmin(): Promise<FacultyMember[]> {
    try {
      const { data, error } = await supabaseAdmin.from('faculty').select('*').order('display_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return memoryFaculty;
  },

  async saveFaculty(member: Partial<FacultyMember>): Promise<FacultyMember> {
    try {
      const { data, error } = await supabaseAdmin.from('faculty').upsert(member).select().single();
      if (!error && data) {
        const idx = memoryFaculty.findIndex(f => f.id === data.id);
        if (idx >= 0) memoryFaculty[idx] = data;
        else memoryFaculty.push(data);
        await this.logAudit('SAVE', 'faculty', data.id, `Saved faculty: ${data.name}`);
        return data;
      }
    } catch (e) {}
    const newFaculty: FacultyMember = {
      id: member.id || `fac-${Date.now()}`,
      name: member.name || 'Faculty Member',
      designation: member.designation || 'Teacher',
      qualification: member.qualification || 'B.Sc., B.Ed.',
      subjects: member.subjects || 'General',
      department: member.department || 'Secondary School',
      experience_years: member.experience_years || 5,
      photo_url: member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
      display_order: member.display_order || memoryFaculty.length + 1,
      is_active: member.is_active ?? true,
      bio: member.bio || '',
    };
    const idx = memoryFaculty.findIndex(f => f.id === newFaculty.id);
    if (idx >= 0) memoryFaculty[idx] = newFaculty;
    else memoryFaculty.push(newFaculty);
    await this.logAudit('SAVE', 'faculty', newFaculty.id, `Saved faculty: ${newFaculty.name}`);
    return newFaculty;
  },

  async deleteFaculty(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('faculty').delete().eq('id', id);
    } catch (e) {}
    memoryFaculty = memoryFaculty.filter(f => f.id !== id);
    await this.logAudit('DELETE', 'faculty', id, 'Deleted faculty member');
    return true;
  },

  // 10. ACHIEVEMENTS (PAGINATED & FILTERED)
  async getAchievements(page: number = 1, pageSize: number = 6, category?: string): Promise<PaginationResult<AchievementItem>> {
    try {
      let query = supabase.from('achievements').select('*', { count: 'exact' }).eq('is_published', true);
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count, error } = await query.order('sort_order', { ascending: true }).range(from, to);
      if (!error && data) {
        return {
          data,
          total: count || data.length,
          page,
          pageSize,
          totalPages: Math.ceil((count || data.length) / pageSize) || 1,
        };
      }
    } catch (e) {}

    let filtered = memoryAchievements.filter(a => a.is_published);
    if (category && category !== 'All') {
      filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  },

  async getAllAchievementsAdmin(): Promise<AchievementItem[]> {
    try {
      const { data, error } = await supabaseAdmin.from('achievements').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return memoryAchievements;
  },

  async saveAchievement(item: Partial<AchievementItem>): Promise<AchievementItem> {
    try {
      const { data, error } = await supabaseAdmin.from('achievements').upsert(item).select().single();
      if (!error && data) {
        const idx = memoryAchievements.findIndex(a => a.id === data.id);
        if (idx >= 0) memoryAchievements[idx] = data;
        else memoryAchievements.unshift(data);
        await this.logAudit('SAVE', 'achievements', data.id, `Saved achievement: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newAch: AchievementItem = {
      id: item.id || `ach-${Date.now()}`,
      title: item.title || 'Student Achievement',
      student_name: item.student_name || '',
      grade_or_class: item.grade_or_class || '',
      category: item.category || 'Academic',
      academic_year: item.academic_year || '2024-2025',
      description: item.description || '',
      image_url: item.image_url || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800',
      sort_order: item.sort_order || 1,
      is_published: item.is_published ?? true,
    };
    const idx = memoryAchievements.findIndex(a => a.id === newAch.id);
    if (idx >= 0) memoryAchievements[idx] = newAch;
    else memoryAchievements.unshift(newAch);
    await this.logAudit('SAVE', 'achievements', newAch.id, `Saved achievement: ${newAch.title}`);
    return newAch;
  },

  async deleteAchievement(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('achievements').delete().eq('id', id);
    } catch (e) {}
    memoryAchievements = memoryAchievements.filter(a => a.id !== id);
    await this.logAudit('DELETE', 'achievements', id, 'Deleted achievement');
    return true;
  },

  // 11. CBSE MANDATORY PUBLIC DISCLOSURE
  async getDisclosureDocuments(): Promise<DisclosureDocument[]> {
    try {
      const { data, error } = await supabase.from('disclosure_documents').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryDisclosures;
  },

  async getAllDisclosuresAdmin(): Promise<DisclosureDocument[]> {
    try {
      const { data, error } = await supabaseAdmin.from('disclosure_documents').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return memoryDisclosures;
  },

  async saveDisclosureDocument(doc: Partial<DisclosureDocument>): Promise<DisclosureDocument> {
    try {
      const { data, error } = await supabaseAdmin.from('disclosure_documents').upsert(doc).select().single();
      if (!error && data) {
        const idx = memoryDisclosures.findIndex(d => d.id === data.id);
        if (idx >= 0) memoryDisclosures[idx] = data;
        else memoryDisclosures.push(data);
        await this.logAudit('SAVE', 'disclosure_documents', data.id, `Saved disclosure document: ${data.document_title}`);
        return data;
      }
    } catch (e) {}
    const newDoc: DisclosureDocument = {
      id: doc.id || `disc-${Date.now()}`,
      category: doc.category || 'B: DOCUMENTS AND INFORMATION',
      document_title: doc.document_title || 'CBSE Public Document',
      document_url: doc.document_url || '#',
      file_size: doc.file_size || 'PDF Document',
      last_updated: doc.last_updated || new Date().toISOString().split('T')[0],
      sort_order: doc.sort_order || memoryDisclosures.length + 1,
      is_published: doc.is_published ?? true,
    };
    const idx = memoryDisclosures.findIndex(d => d.id === newDoc.id);
    if (idx >= 0) memoryDisclosures[idx] = newDoc;
    else memoryDisclosures.push(newDoc);
    await this.logAudit('SAVE', 'disclosure_documents', newDoc.id, `Saved disclosure: ${newDoc.document_title}`);
    return newDoc;
  },

  async deleteDisclosureDocument(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('disclosure_documents').delete().eq('id', id);
    } catch (e) {}
    memoryDisclosures = memoryDisclosures.filter(d => d.id !== id);
    await this.logAudit('DELETE', 'disclosure_documents', id, 'Deleted disclosure document');
    return true;
  },

  // 12. ACADEMIC CALENDARS & EXAMINATIONS
  async getAcademicCalendars(): Promise<AcademicCalendarItem[]> {
    try {
      const { data, error } = await supabase.from('academic_calendars').select('*').eq('is_published', true).order('event_date', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryCalendars;
  },

  async getExaminationUpdates(): Promise<ExaminationUpdate[]> {
    try {
      const { data, error } = await supabase.from('examination_updates').select('*').eq('is_published', true).order('start_date', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryExams;
  },

  // 13. DOWNLOADS & RESOURCES
  async getDownloads(): Promise<DownloadItem[]> {
    try {
      const { data, error } = await supabase.from('downloads').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryDownloads;
  },

  async saveDownload(item: Partial<DownloadItem>): Promise<DownloadItem> {
    try {
      const { data, error } = await supabaseAdmin.from('downloads').upsert(item).select().single();
      if (!error && data) {
        const idx = memoryDownloads.findIndex(d => d.id === data.id);
        if (idx >= 0) memoryDownloads[idx] = data;
        else memoryDownloads.push(data);
        await this.logAudit('SAVE', 'downloads', data.id, `Saved download item: ${data.title}`);
        return data;
      }
    } catch (e) {}
    const newDl: DownloadItem = {
      id: item.id || `dl-${Date.now()}`,
      title: item.title || 'School Document',
      category: item.category || 'Forms',
      file_url: item.file_url || '#',
      description: item.description || '',
      file_size: item.file_size || '1.0 MB PDF',
      is_published: item.is_published ?? true,
      sort_order: item.sort_order || memoryDownloads.length + 1,
    };
    const idx = memoryDownloads.findIndex(d => d.id === newDl.id);
    if (idx >= 0) memoryDownloads[idx] = newDl;
    else memoryDownloads.push(newDl);
    await this.logAudit('SAVE', 'downloads', newDl.id, `Saved download: ${newDl.title}`);
    return newDl;
  },

  async deleteDownload(id: string): Promise<boolean> {
    try {
      await supabaseAdmin.from('downloads').delete().eq('id', id);
    } catch (e) {}
    memoryDownloads = memoryDownloads.filter(d => d.id !== id);
    await this.logAudit('DELETE', 'downloads', id, 'Deleted download');
    return true;
  },

  // 14. FAQS
  async getFAQs(): Promise<FAQItem[]> {
    try {
      const { data, error } = await supabase.from('faq_items').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryFAQs;
  },

  // 15. AUDIT LOGS
  async logAudit(action: string, entity: string, entity_id?: string, details?: string, actor: string = 'Admin'): Promise<void> {
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      actor,
      action,
      entity,
      entity_id,
      details,
      created_at: new Date().toISOString(),
    };
    try {
      await supabaseAdmin.from('audit_logs').insert([log]);
    } catch (e) {}
    memoryAuditLogs.unshift(log);
  },

  async getAuditLogs(limit: number = 20): Promise<AuditLog[]> {
    try {
      const { data, error } = await supabaseAdmin.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(limit);
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return memoryAuditLogs.slice(0, limit);
  },

  // 16. STORAGE FILE UPLOAD (Supabase Storage bucket 'school-assets')
  async uploadFile(file: Blob, path: string): Promise<string | null> {
    try {
      const { data, error } = await supabaseAdmin.storage.from('school-assets').upload(path, file, {
        upsert: true,
      });
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('school-assets').getPublicUrl(path);
        return publicUrlData.publicUrl;
      }
    } catch (e) {}
    return null;
  }
};

