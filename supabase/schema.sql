-- ==============================================================================
-- JYOTHI VIDYA NIKETAN E.M. HIGH SCHOOL (KOILAKUNTLA)
-- COMPLETE DATABASE SCHEMA WITH ROW LEVEL SECURITY & INDEXES
-- CBSE Affiliation No: 130603 | Managed by Sarabha Reddy Educational Society
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_name TEXT NOT NULL DEFAULT 'Jyothi Vidya Niketan E.M. High School',
    tagline TEXT NOT NULL DEFAULT 'A place to learn, A chance to excel',
    affiliation_number TEXT NOT NULL DEFAULT '130603',
    school_code TEXT DEFAULT '57218',
    trust_name TEXT DEFAULT 'Sarabha Reddy Educational Society',
    established_year TEXT DEFAULT '2018',
    primary_phone TEXT DEFAULT '+91 7997999863',
    secondary_phone TEXT DEFAULT '+91 7997999864',
    primary_email TEXT DEFAULT 'jyothividyaniketan@gmail.com',
    secondary_email TEXT DEFAULT 'info@jyothividyaniketan.com',
    address TEXT DEFAULT 'Survey No: 872/2 & 872/3, Jammalamadugu Road, Koilakuntla, Nandyal District, Andhra Pradesh - 518134',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Jyothi+Vidya+Niketan+Koilakuntla',
    whatsapp_number TEXT DEFAULT '+917997999863',
    whatsapp_enabled BOOLEAN DEFAULT true,
    whatsapp_default_message TEXT DEFAULT 'Hello! I would like to enquire about admissions at Jyothi Vidya Niketan E.M. High School.',
    logo_url TEXT DEFAULT '/images/logo.png',
    favicon_url TEXT DEFAULT '/favicon.ico',
    current_academic_year TEXT DEFAULT '2025-2026',
    admission_open BOOLEAN DEFAULT true,
    ticker_enabled BOOLEAN DEFAULT true,
    ticker_text TEXT DEFAULT 'Admissions Open for Academic Year 2025-26 from Pre-Primary to Class X. Visit campus or contact +91 7997999863.',
    popup_enabled BOOLEAN DEFAULT false,
    popup_title TEXT DEFAULT 'Admissions Announcement 2025-26',
    popup_message TEXT DEFAULT 'Admissions are now open for Nursery to Class X. Download the application form or submit your enquiry online.',
    popup_link TEXT DEFAULT '/admissions/enquiry',
    popup_image_url TEXT DEFAULT '',
    popup_badge TEXT DEFAULT '',
    popup_cta_text TEXT DEFAULT '',
    bulletin_items JSONB DEFAULT '[]'::jsonb,
    hero_video_url TEXT DEFAULT '',
    hero_background_image TEXT DEFAULT '',
    facebook_url TEXT DEFAULT '',
    instagram_url TEXT DEFAULT '',
    youtube_url TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    google_verification_code TEXT DEFAULT '',
    google_analytics_id TEXT DEFAULT '',
    hero_headline TEXT DEFAULT 'Empowering Young Minds for Excellence & Integrity',
    hero_subheadline TEXT DEFAULT 'CBSE Affiliated English Medium School in Koilakuntla, providing holistic education, modern smart classrooms, and character-building values since 2018.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. HOMEPAGE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image_url TEXT,
    video_url TEXT,
    button_text TEXT,
    button_url TEXT,
    sort_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT true,
    meta_json JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. PAGES & TECHNICAL SEO SETTINGS
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    focus_keyword TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    is_indexable BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_external BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. ANNOUNCEMENTS & CIRCULARS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    category TEXT DEFAULT 'General',
    attachment_url TEXT,
    is_ticker BOOLEAN DEFAULT false,
    is_popup BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    publish_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. ADMISSION ENQUIRIES
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    grade_applying TEXT NOT NULL,
    academic_year TEXT DEFAULT '2025-2026',
    date_of_birth DATE,
    gender TEXT,
    current_school TEXT,
    address TEXT,
    city TEXT DEFAULT 'Koilakuntla',
    message TEXT,
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Follow-up', 'Converted', 'Closed'
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. ACADEMIC CALENDARS
CREATE TABLE IF NOT EXISTS public.academic_calendars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    academic_year TEXT NOT NULL DEFAULT '2025-2026',
    event_date DATE NOT NULL,
    end_date DATE,
    event_type TEXT DEFAULT 'Academic', -- 'Exam', 'Holiday', 'Celebration', 'Meeting', 'Term'
    description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. EXAMINATION UPDATES
CREATE TABLE IF NOT EXISTS public.examination_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    class_grade TEXT NOT NULL, -- e.g. 'Class X', 'Class IX', 'Classes VI-VIII', 'All Classes'
    exam_type TEXT NOT NULL, -- 'FA-1', 'FA-2', 'SA-1', 'Pre-Board', 'Board Exam', 'Annual Exam'
    start_date DATE NOT NULL,
    end_date DATE,
    timetable_url TEXT,
    syllabus_notes TEXT,
    is_published BOOLEAN DEFAULT true,
    academic_year TEXT DEFAULT '2025-2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. FACULTY DIRECTORY
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    qualification TEXT NOT NULL,
    subjects TEXT,
    department TEXT NOT NULL, -- 'Leadership', 'Secondary School', 'Middle School', 'Primary School', 'Pre-Primary', 'Special Activity', 'Non-Teaching'
    experience_years INT DEFAULT 5,
    photo_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. GALLERY ALBUMS
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Annual Day', 'Sports Day', 'Independence Day', 'Republic Day', 'Cultural Activities', 'Classroom Activities', 'School Celebrations', 'Educational Trips', 'Competitions', 'Campus and Infrastructure'
    description TEXT,
    event_date DATE DEFAULT CURRENT_DATE,
    cover_image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. GALLERY IMAGES
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 12. GALLERY VIDEOS
CREATE TABLE IF NOT EXISTS public.gallery_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT DEFAULT 'School Activities',
    description TEXT,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 13. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Celebration',
    event_date DATE NOT NULL,
    start_time TEXT,
    end_time TEXT,
    venue TEXT DEFAULT 'School Auditorium / Campus Ground',
    description TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 14. NOTICES (CIRCULARS)
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    circular_number TEXT,
    notice_date DATE DEFAULT CURRENT_DATE,
    category TEXT DEFAULT 'Circular',
    file_url TEXT,
    is_important BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    expires_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 15. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    student_name TEXT,
    grade_or_class TEXT,
    category TEXT NOT NULL, -- 'Academic', 'Sports', 'Cultural', 'Competition'
    academic_year TEXT DEFAULT '2024-2025',
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 16. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL, -- 'Parent of Class X Student', 'Alumnus', etc.
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 17. CBSE MANDATORY PUBLIC DISCLOSURE DOCUMENTS
CREATE TABLE IF NOT EXISTS public.disclosure_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'A: GENERAL INFORMATION', 'B: DOCUMENTS AND INFORMATION', 'C: RESULT AND ACADEMICS', 'D: STAFF (TEACHING)', 'E: SCHOOL INFRASTRUCTURE'
    document_title TEXT NOT NULL,
    document_url TEXT NOT NULL,
    file_size TEXT DEFAULT 'PDF Document',
    last_updated DATE DEFAULT CURRENT_DATE,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 18. DOWNLOADS
CREATE TABLE IF NOT EXISTS public.downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Admission Forms', 'Syllabus', 'Academic Handbook', 'Rules & Regulations'
    file_url TEXT NOT NULL,
    description TEXT,
    file_size TEXT DEFAULT '1.2 MB',
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 19. FAQ ITEMS
CREATE TABLE IF NOT EXISTS public.faq_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'Admissions',
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 20. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor TEXT NOT NULL DEFAULT 'Admin',
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE & CRAWLER EFFICIENCY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_gallery_albums_slug ON public.gallery_albums(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_category ON public.gallery_albums(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_album_id ON public.gallery_images(album_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_notices_date ON public.notices(notice_date DESC);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_status ON public.admission_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_disclosure_category ON public.disclosure_documents(category);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examination_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disclosure_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can SELECT published data
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view enabled sections" ON public.homepage_sections;
CREATE POLICY "Public can view enabled sections" ON public.homepage_sections FOR SELECT USING (is_enabled = true);

DROP POLICY IF EXISTS "Public can view published pages" ON public.pages;
CREATE POLICY "Public can view published pages" ON public.pages FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view active navigation" ON public.navigation_items;
CREATE POLICY "Public can view active navigation" ON public.navigation_items FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view published announcements" ON public.announcements;
CREATE POLICY "Public can view published announcements" ON public.announcements FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can insert admission enquiries" ON public.admission_enquiries;
CREATE POLICY "Public can insert admission enquiries" ON public.admission_enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view published calendars" ON public.academic_calendars;
CREATE POLICY "Public can view published calendars" ON public.academic_calendars FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published exam updates" ON public.examination_updates;
CREATE POLICY "Public can view published exam updates" ON public.examination_updates FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view active faculty" ON public.faculty;
CREATE POLICY "Public can view active faculty" ON public.faculty FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view published albums" ON public.gallery_albums;
CREATE POLICY "Public can view published albums" ON public.gallery_albums FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view images of published albums" ON public.gallery_images;
CREATE POLICY "Public can view images of published albums" ON public.gallery_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view published videos" ON public.gallery_videos;
CREATE POLICY "Public can view published videos" ON public.gallery_videos FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published notices" ON public.notices;
CREATE POLICY "Public can view published notices" ON public.notices FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published achievements" ON public.achievements;
CREATE POLICY "Public can view published achievements" ON public.achievements FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published testimonials" ON public.testimonials;
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published disclosures" ON public.disclosure_documents;
CREATE POLICY "Public can view published disclosures" ON public.disclosure_documents FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published downloads" ON public.downloads;
CREATE POLICY "Public can view published downloads" ON public.downloads FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published FAQs" ON public.faq_items;
CREATE POLICY "Public can view published FAQs" ON public.faq_items FOR SELECT USING (is_published = true);

-- Service role key / Admin has full access to all operations
DROP POLICY IF EXISTS "Service role full access settings" ON public.site_settings;
CREATE POLICY "Service role full access settings" ON public.site_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access sections" ON public.homepage_sections;
CREATE POLICY "Service role full access sections" ON public.homepage_sections FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access pages" ON public.pages;
CREATE POLICY "Service role full access pages" ON public.pages FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access navigation" ON public.navigation_items;
CREATE POLICY "Service role full access navigation" ON public.navigation_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access announcements" ON public.announcements;
CREATE POLICY "Service role full access announcements" ON public.announcements FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access enquiries" ON public.admission_enquiries;
CREATE POLICY "Service role full access enquiries" ON public.admission_enquiries FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access calendars" ON public.academic_calendars;
CREATE POLICY "Service role full access calendars" ON public.academic_calendars FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access exam updates" ON public.examination_updates;
CREATE POLICY "Service role full access exam updates" ON public.examination_updates FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access faculty" ON public.faculty;
CREATE POLICY "Service role full access faculty" ON public.faculty FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access albums" ON public.gallery_albums;
CREATE POLICY "Service role full access albums" ON public.gallery_albums FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access images" ON public.gallery_images;
CREATE POLICY "Service role full access images" ON public.gallery_images FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access videos" ON public.gallery_videos;
CREATE POLICY "Service role full access videos" ON public.gallery_videos FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access events" ON public.events;
CREATE POLICY "Service role full access events" ON public.events FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access notices" ON public.notices;
CREATE POLICY "Service role full access notices" ON public.notices FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access achievements" ON public.achievements;
CREATE POLICY "Service role full access achievements" ON public.achievements FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access testimonials" ON public.testimonials;
CREATE POLICY "Service role full access testimonials" ON public.testimonials FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access disclosures" ON public.disclosure_documents;
CREATE POLICY "Service role full access disclosures" ON public.disclosure_documents FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access downloads" ON public.downloads;
CREATE POLICY "Service role full access downloads" ON public.downloads FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access FAQs" ON public.faq_items;
CREATE POLICY "Service role full access FAQs" ON public.faq_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access audit logs" ON public.audit_logs;
CREATE POLICY "Service role full access audit logs" ON public.audit_logs FOR ALL USING (true);

-- SAFE UPGRADES FOR EXISTING DATABASES
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_video_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_background_image TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS facebook_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS youtube_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS linkedin_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS popup_image_url TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS popup_badge TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS popup_cta_text TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS bulletin_items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_1_value TEXT DEFAULT '100%';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_1_label TEXT DEFAULT 'CBSE Class X Pass Rate';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_2_value TEXT DEFAULT '30+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_2_label TEXT DEFAULT 'Certified Educators';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_3_value TEXT DEFAULT '15:1';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_3_label TEXT DEFAULT 'Student-Teacher Ratio';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_4_value TEXT DEFAULT '8+ Acres';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_4_label TEXT DEFAULT 'Lush Campus & Grounds';


