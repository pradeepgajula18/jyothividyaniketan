export interface BulletinItem {
  id: string;
  category: 'EXAM' | 'EVENT' | 'ADMISSION' | 'VICTORY' | 'HOLIDAY' | 'CIRCULAR';
  title: string;
  link?: string;
  is_urgent?: boolean;
}

export interface SiteSettings {
  id?: string;
  school_name: string;
  tagline: string;
  affiliation_number: string;
  school_code: string;
  trust_name: string;
  established_year: string;
  primary_phone: string;
  secondary_phone: string;
  primary_email: string;
  secondary_email: string;
  address: string;
  google_maps_url: string;
  whatsapp_number: string;
  whatsapp_enabled: boolean;
  whatsapp_default_message: string;
  logo_url: string;
  favicon_url: string;
  current_academic_year: string;
  admission_open: boolean;
  ticker_enabled: boolean;
  ticker_text: string;
  bulletin_items?: BulletinItem[];
  popup_enabled: boolean;
  popup_title: string;
  popup_message: string;
  popup_link: string;
  popup_image_url?: string;
  popup_badge?: string;
  popup_cta_text?: string;
  google_verification_code?: string;
  google_analytics_id?: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_video_url?: string;
  hero_background_image?: string;
  stat_1_value?: string;
  stat_1_label?: string;
  stat_2_value?: string;
  stat_2_label?: string;
  stat_3_value?: string;
  stat_3_label?: string;
  stat_4_value?: string;
  stat_4_label?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
  updated_at?: string;
}

export interface HomepageSection {
  id?: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  video_url?: string;
  button_text?: string;
  button_url?: string;
  sort_order: number;
  is_enabled: boolean;
  meta_json?: Record<string, any>;
  updated_at?: string;
}

export interface PageSEO {
  id?: string;
  slug: string;
  title: string;
  content?: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  focus_keyword: string;
  og_title: string;
  og_description: string;
  og_image?: string;
  is_indexable: boolean;
  is_published: boolean;
  updated_at?: string;
}

export interface NavItem {
  id?: string;
  label: string;
  path: string;
  children?: NavItem[];
  parent_id?: string | null;
  sort_order: number;
  is_active: boolean;
  is_external?: boolean;
}

export interface Announcement {
  id?: string;
  title: string;
  summary?: string;
  content?: string;
  category: string;
  attachment_url?: string;
  is_ticker: boolean;
  is_popup: boolean;
  is_pinned: boolean;
  is_published: boolean;
  publish_at: string;
  expires_at?: string | null;
  created_at?: string;
}

export interface AdmissionEnquiry {
  id?: string;
  student_name: string;
  parent_name: string;
  email?: string;
  phone: string;
  grade_applying: string;
  academic_year: string;
  date_of_birth?: string;
  gender?: string;
  current_school?: string;
  address?: string;
  city?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AcademicCalendarItem {
  id?: string;
  title: string;
  academic_year: string;
  event_date: string;
  end_date?: string | null;
  event_type: 'Academic' | 'Exam' | 'Holiday' | 'Celebration' | 'Meeting' | 'Term';
  description?: string;
  is_published: boolean;
}

export interface ExaminationUpdate {
  id?: string;
  title: string;
  class_grade: string;
  exam_type: string;
  start_date: string;
  end_date?: string;
  timetable_url?: string;
  syllabus_notes?: string;
  is_published: boolean;
  academic_year: string;
}

export interface FacultyMember {
  id?: string;
  name: string;
  designation: string;
  qualification: string;
  subjects?: string;
  department: 'Leadership' | 'Secondary School' | 'Middle School' | 'Primary School' | 'Pre-Primary' | 'Special Activity' | 'Non-Teaching';
  experience_years: number;
  photo_url?: string;
  display_order: number;
  is_active: boolean;
  bio?: string;
}

export interface GalleryAlbum {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
  event_date: string;
  cover_image_url: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  photo_count?: number;
  images?: GalleryImage[];
  created_at?: string;
}

export interface GalleryImage {
  id?: string;
  album_id: string;
  image_url: string;
  caption?: string;
  alt_text?: string;
  sort_order: number;
  created_at?: string;
}

export interface GalleryVideo {
  id?: string;
  title: string;
  video_url: string;
  thumbnail_url?: string;
  category: string;
  description?: string;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface EventItem {
  id?: string;
  slug: string;
  title: string;
  category: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  venue: string;
  description?: string;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
}

export interface NoticeItem {
  id?: string;
  title: string;
  circular_number?: string;
  notice_date: string;
  category: string;
  file_url?: string;
  is_important: boolean;
  is_published: boolean;
  expires_at?: string | null;
  created_at?: string;
}

export interface AchievementItem {
  id?: string;
  title: string;
  student_name?: string;
  grade_or_class?: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Competition';
  academic_year: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_published: boolean;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar_url?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface DisclosureDocument {
  id?: string;
  category: string;
  document_title: string;
  document_url: string;
  file_size?: string;
  last_updated: string;
  sort_order: number;
  is_published: boolean;
}

export interface DownloadItem {
  id?: string;
  title: string;
  category: string;
  file_url: string;
  description?: string;
  file_size: string;
  is_published: boolean;
  sort_order: number;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
}

export interface AuditLog {
  id?: string;
  actor: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: string;
  created_at: string;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

