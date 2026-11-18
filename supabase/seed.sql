-- ==============================================================================
-- JYOTHI VIDYA NIKETAN E.M. HIGH SCHOOL (KOILAKUNTLA)
-- VERIFIED SEED DATA
-- ==============================================================================

-- 1. Site Settings
INSERT INTO public.site_settings (
    school_name, tagline, affiliation_number, school_code, trust_name, established_year,
    primary_phone, secondary_phone, primary_email, secondary_email, address,
    google_maps_url, whatsapp_number, whatsapp_enabled, current_academic_year, admission_open,
    ticker_enabled, ticker_text, popup_enabled, popup_title, popup_message, popup_link,
    hero_headline, hero_subheadline
) VALUES (
    'Jyothi Vidya Niketan E.M. High School',
    'A place to learn, A chance to excel',
    '130603',
    '57218',
    'Sarabha Reddy Educational Society',
    '2018',
    '+91 7997999863',
    '+91 7997999864',
    'jyothividyaniketan@gmail.com',
    'admissions@jyothividyaniketan.com',
    'Survey No: 872/2 & 872/3, Jammalamadugu Road, Koilakuntla, Nandyal District, Andhra Pradesh - 518134',
    'https://maps.google.com/?q=Jyothi+Vidya+Niketan+Koilakuntla',
    '+917997999863',
    true,
    '2025-2026',
    true,
    true,
    '📢 Admissions Open for Academic Year 2025-26 (Nursery to Class X) | CBSE Affiliated (No. 130603) | Call: +91 7997999863',
    true,
    'Admissions Open for Academic Year 2025-26',
    'Join a nurturing academic environment with world-class faculty, smart digital classrooms, comprehensive sports, and STEM labs. Applications are now being accepted for Pre-Primary to Class X.',
    '/admissions/enquiry',
    'Inspiring Excellence, Cultivating Character & Leadership',
    'Welcome to Jyothi Vidya Niketan E.M. High School, Koilakuntla — where progressive CBSE education meets traditional ethical values to prepare tomorrow’s global innovators.'
) ON CONFLICT DO NOTHING;

-- 2. Homepage Sections
INSERT INTO public.homepage_sections (section_key, title, subtitle, content, button_text, button_url, sort_order, is_enabled) VALUES
('hero', 'Welcome to Jyothi Vidya Niketan', 'A CBSE Affiliated English Medium Institution', 'Fostering intellectual curiosity, compassionate leadership, and academic rigor in Koilakuntla.', 'Apply for Admission', '/admissions/enquiry', 1, true),
('stats', 'Our Impact in Numbers', 'Committed to Quality Education', 'Verified metrics that demonstrate our academic consistency and child-first learning environment.', 'Explore About Us', '/about-us', 2, true),
('about_preview', 'About Jyothi Vidya Niketan', 'Founded in 2018 under Sarabha Reddy Educational Society', 'Situated in Koilakuntla, Andhra Pradesh, Jyothi Vidya Niketan is committed to providing modern, holistic education rooted in moral principles. With state-of-the-art labs, expansive play areas, and technology-driven classrooms, we empower students to achieve their full potential.', 'Read Full Story', '/about-us', 3, true),
('academics_preview', 'Academic Excellence Across All Stages', 'Pre-Primary to Secondary School', 'From foundational play-way learning in kindergarten to CBSE board mastery in secondary school, our curriculum builds critical thinking and creative confidence.', 'View Academic Programs', '/academics', 4, true),
('facilities_preview', 'Campus & Learning Infrastructure', 'A Safe, Stimulating & Well-Equipped Campus', 'Features smart interactive classrooms, high-tech composite science labs, modern mathematics laboratory, computer center, extensive library, and expansive outdoor sports grounds.', 'Explore Campus Facilities', '/campus-facilities', 5, true),
('principal_message', 'Principal''s Message', 'Nurturing Future Citizens of Integrity', 'Education is not merely the accumulation of facts; it is the ignite of curiosity and character. At Jyothi Vidya Niketan, every child is encouraged to question, explore, and excel in a warm, disciplined environment.', 'Read Full Message', '/about-us/principals-message', 6, true),
('events_news', 'Latest News & Events', 'Campus Life & Celebrations', 'Stay updated with circulars, academic milestones, sports competitions, and cultural celebrations.', 'View All News & Events', '/news-events', 7, true),
('testimonials', 'What Our School Community Says', 'Voices of Parents and Students', 'Authentic reflections from families who trust Jyothi Vidya Niketan for their children''s academic and character growth.', 'Read More Testimonials', '/about-us', 8, true),
('cta_admissions', 'Take the Next Step for Your Child’s Future', 'Admissions Open for Academic Year 2025-26', 'Limited seats available across grades from Nursery to Class X. Connect with our admissions counselors today.', 'Submit Admission Enquiry', '/admissions/enquiry', 9, true)
ON CONFLICT (section_key) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- 3. SEO Pages
INSERT INTO public.pages (slug, title, meta_title, meta_description, canonical_url, focus_keyword, og_title, og_description) VALUES
('home', 'Home', 'Jyothi Vidya Niketan | CBSE School in Koilakuntla, Andhra Pradesh', 'Discover Jyothi Vidya Niketan E.M. High School in Koilakuntla, Andhra Pradesh (CBSE Affiliation 130603). Offering top-tier academics, smart classrooms, sports, and holistic development.', 'https://www.jyothividyaniketan.com/', 'Jyothi Vidya Niketan', 'Jyothi Vidya Niketan | Premier CBSE School in Koilakuntla', 'Official portal of Jyothi Vidya Niketan E.M. High School. Admissions open for 2025-26.'),
('about-us', 'About Us', 'About Us | Jyothi Vidya Niketan E.M. High School Koilakuntla', 'Learn about Jyothi Vidya Niketan E.M. High School, established in 2018 in Koilakuntla under Sarabha Reddy Educational Society with CBSE curriculum.', 'https://www.jyothividyaniketan.com/about-us', 'About Jyothi Vidya Niketan', 'About Jyothi Vidya Niketan E.M. High School', 'History, values, and educational philosophy of Jyothi Vidya Niketan in Koilakuntla.'),
('principals-message', 'Principal''s Message', 'Principal''s Message | Jyothi Vidya Niketan Koilakuntla', 'Read the official message from the Principal of Jyothi Vidya Niketan E.M. High School outlining our vision for student empowerment.', 'https://www.jyothividyaniketan.com/about-us/principals-message', 'Principal Jyothi Vidya Niketan', 'Principal''s Message | Jyothi Vidya Niketan', 'Guiding our learners towards academic distinction and strong moral values.'),
('vision-mission', 'Vision & Mission', 'Vision & Mission | Jyothi Vidya Niketan Koilakuntla', 'Explore the vision, core values, and educational mission of Jyothi Vidya Niketan E.M. High School, Koilakuntla.', 'https://www.jyothividyaniketan.com/about-us/vision-mission', 'Jyothi Vidya Niketan Vision', 'Vision & Mission | Jyothi Vidya Niketan', 'Fostering academic excellence, ethical integrity, and global competence.'),
('academics', 'Academic Programs', 'Academic Programs | Jyothi Vidya Niketan Koilakuntla', 'Comprehensive CBSE curriculum from Pre-Primary to Secondary School (Classes I to X) at Jyothi Vidya Niketan in Koilakuntla.', 'https://www.jyothividyaniketan.com/academics', 'CBSE Academic Curriculum Koilakuntla', 'Academic Programs | Jyothi Vidya Niketan', 'Holistic CBSE curriculum tailored for progressive foundational and secondary learning.'),
('pre-primary', 'Pre-Primary Education', 'Pre-Primary School (Nursery, LKG, UKG) | Jyothi Vidya Niketan', 'Child-centric early childhood education at Jyothi Vidya Niketan. Experiential, joyful learning for Nursery, LKG, and UKG in Koilakuntla.', 'https://www.jyothividyaniketan.com/academics/pre-primary', 'Pre-Primary School Koilakuntla', 'Pre-Primary School | Jyothi Vidya Niketan', 'Joyful foundational learning for early childhood development.'),
('primary-school', 'Primary School', 'Primary School (Classes I - V) | Jyothi Vidya Niketan Koilakuntla', 'Primary school education focusing on literacy, numeracy, scientific inquiry, and creative arts at Jyothi Vidya Niketan.', 'https://www.jyothividyaniketan.com/academics/primary-school', 'Primary School Koilakuntla', 'Primary School | Jyothi Vidya Niketan', 'Strong foundational education in CBSE English Medium.'),
('middle-school', 'Middle School', 'Middle School (Classes VI - VIII) | Jyothi Vidya Niketan Koilakuntla', 'Middle school curriculum designed to build conceptual depth, analytical thinking, and laboratory sciences at Jyothi Vidya Niketan.', 'https://www.jyothividyaniketan.com/academics/middle-school', 'Middle School Koilakuntla', 'Middle School | Jyothi Vidya Niketan', 'Transitioning young learners into confident critical thinkers.'),
('secondary-school', 'Secondary School', 'Secondary School (Classes IX - X) | Jyothi Vidya Niketan Koilakuntla', 'Rigorous CBSE Class 9 and 10 board preparation with mentorship, mock examinations, and career guidance at Jyothi Vidya Niketan.', 'https://www.jyothividyaniketan.com/academics/secondary-school', 'CBSE Secondary School Koilakuntla', 'Secondary School (Classes IX & X) | Jyothi Vidya Niketan', 'Excellence in CBSE Board examinations with proven track record.'),
('campus-facilities', 'Campus & Infrastructure', 'Campus & Facilities | Jyothi Vidya Niketan Koilakuntla', 'Explore modern infrastructure at Jyothi Vidya Niketan: Smart classrooms, computer labs, science labs, library, sports ground, and safe transport.', 'https://www.jyothividyaniketan.com/campus-facilities', 'Jyothi Vidya Niketan Facilities', 'Campus Infrastructure | Jyothi Vidya Niketan', 'Safe, well-equipped campus with smart tech and spacious sports facilities.'),
('faculty', 'Faculty & Staff', 'Our Faculty | Jyothi Vidya Niketan Koilakuntla', 'Meet our dedicated, experienced, and certified educators at Jyothi Vidya Niketan E.M. High School in Koilakuntla.', 'https://www.jyothividyaniketan.com/faculty', 'Faculty Jyothi Vidya Niketan', 'Faculty Directory | Jyothi Vidya Niketan', 'Passionate educators committed to student success.'),
('student-life', 'Student Life', 'Student Life & Co-Curriculars | Jyothi Vidya Niketan Koilakuntla', 'Discover student life at Jyothi Vidya Niketan: Clubs, arts, yoga, athletics, cultural events, and leadership opportunities.', 'https://www.jyothividyaniketan.com/student-life', 'Student Life Koilakuntla', 'Student Life | Jyothi Vidya Niketan', 'Vibrant co-curricular experiences beyond the textbook.'),
('achievements', 'School Achievements', 'Achievements & Accolades | Jyothi Vidya Niketan Koilakuntla', 'Academic milestones, board results, sports victories, and inter-school competition awards earned by students of Jyothi Vidya Niketan.', 'https://www.jyothividyaniketan.com/achievements', 'Jyothi Vidya Niketan Achievements', 'Achievements | Jyothi Vidya Niketan', 'Celebrating our students’ excellence in academics and sports.'),
('gallery', 'Photo & Video Gallery', 'Photo & Video Gallery | Jyothi Vidya Niketan Koilakuntla', 'Browse photo albums and event highlights from Annual Day, Sports Day, National Festivals, and classroom activities.', 'https://www.jyothividyaniketan.com/gallery', 'Jyothi Vidya Niketan Gallery', 'Photo & Video Gallery | Jyothi Vidya Niketan', 'Moments of joy, learning, and celebration captured on campus.'),
('news-events', 'News & Events', 'News & Events | Jyothi Vidya Niketan Koilakuntla', 'Latest updates, upcoming events, academic schedules, and celebration summaries from Jyothi Vidya Niketan.', 'https://www.jyothividyaniketan.com/news-events', 'School Events Koilakuntla', 'News & Events | Jyothi Vidya Niketan', 'Stay connected with campus events and announcements.'),
('notice-board', 'Notice Board & Circulars', 'Notice Board | Jyothi Vidya Niketan Koilakuntla', 'Official school circulars, examination schedules, holiday notifications, and downloadable PDFs for parents and students.', 'https://www.jyothividyaniketan.com/notice-board', 'Notice Board Jyothi Vidya Niketan', 'Notice Board | Jyothi Vidya Niketan', 'Official circulars and announcements directly from the administration.'),
('admissions', 'Admissions', 'Admissions 2025-26 | Jyothi Vidya Niketan Koilakuntla', 'Apply for admission at Jyothi Vidya Niketan E.M. High School (Nursery to Class X). View eligibility, process, fee structure, and criteria.', 'https://www.jyothividyaniketan.com/admissions', 'Jyothi Vidya Niketan Admissions', 'Admissions 2025-26 | Jyothi Vidya Niketan', 'Begin your child’s educational journey with excellence.'),
('mandatory-public-disclosure', 'Mandatory Public Disclosure', 'CBSE Mandatory Public Disclosure | Jyothi Vidya Niketan (Affiliation 130603)', 'Official CBSE Mandatory Public Disclosure document repository as per CBSE guidelines for Jyothi Vidya Niketan E.M. High School Koilakuntla.', 'https://www.jyothividyaniketan.com/mandatory-public-disclosure', 'CBSE Mandatory Disclosure 130603', 'CBSE Mandatory Public Disclosure | Jyothi Vidya Niketan', 'Official statutory documents, society registration, affiliation certificates, and safety NOCs.'),
('downloads', 'Downloads & Resources', 'Downloads & Resources | Jyothi Vidya Niketan Koilakuntla', 'Download admission forms, syllabus outlines, book lists, holiday calendars, and student guidelines.', 'https://www.jyothividyaniketan.com/downloads', 'Jyothi Vidya Niketan Downloads', 'Downloads | Jyothi Vidya Niketan', 'Helpful PDF resources for students and parents.'),
('faq', 'Frequently Asked Questions', 'FAQ | Jyothi Vidya Niketan E.M. High School Koilakuntla', 'Frequently asked questions regarding CBSE affiliation, admission procedure, school timings, transport, and extra-curriculars.', 'https://www.jyothividyaniketan.com/faq', 'Jyothi Vidya Niketan FAQ', 'FAQ | Jyothi Vidya Niketan', 'Clear answers to common questions for prospective parents.'),
('contact-us', 'Contact Us', 'Contact Us | Jyothi Vidya Niketan Koilakuntla', 'Get in touch with Jyothi Vidya Niketan E.M. High School. Jammalamadugu Road, Koilakuntla, Andhra Pradesh. Phone: +91 7997999863.', 'https://www.jyothividyaniketan.com/contact-us', 'Contact Jyothi Vidya Niketan', 'Contact Us | Jyothi Vidya Niketan', 'We welcome your visits and inquiries.')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, meta_title = EXCLUDED.meta_title;

-- 4. Sample Albums
INSERT INTO public.gallery_albums (slug, title, category, description, event_date, cover_image_url, is_featured, is_published, sort_order) VALUES
('annual-day-2026', 'Annual Day Celebrations 2026', 'Annual Day', 'Grand cultural evening featuring classical dances, theatrical plays, musical ensembles, and academic awards ceremony.', '2026-02-15', 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200', true, true, 1),
('sports-day-2026', 'Annual Athletic Meet & Sports Day 2026', 'Sports Day', 'High-energy track and field competitions, march-past by house contingents, yoga displays, and medal distribution.', '2026-01-20', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200', true, true, 2),
('independence-day-2025', '79th Independence Day Celebration', 'Independence Day', 'Patriotic parade, flag hoisting by the Principal, patriotic songs, and inspiring speeches honoring freedom fighters.', '2025-08-15', 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200', true, true, 3),
('republic-day-2026', '77th Republic Day Celebration', 'Republic Day', 'Ceremonial salute to the Constitution of India, cultural tableau, and pledge for national unity by students and faculty.', '2026-01-26', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200', false, true, 4),
('science-exhibition-2025', 'Pratibha Science & Innovation Fair', 'Competitions', 'Interactive STEM models, robotics demonstrations, eco-sustainability projects, and mathematics puzzles by young minds.', '2025-11-28', 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200', true, true, 5),
('cultural-fest-2025', 'Kala Utsav - Cultural Activities', 'Cultural Activities', 'Showcasing Indian traditional arts, rangoli competitions, debate, and music performances.', '2025-10-14', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200', false, true, 6),
('classroom-learning-2025', 'Smart Classroom & Interactive Learning', 'Classroom Activities', 'Glimpses of daily collaborative learning, digital smart boards, reading corners, and group problem solving.', '2025-09-10', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200', false, true, 7),
('educational-trip-2025', 'Educational Excursion to Belum Caves', 'Educational Trips', 'Students explored geological formations, archaeological heritage, and natural science during the annual school study tour.', '2025-12-05', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200', false, true, 8),
('campus-greenery-2026', 'Campus Infrastructure & Green Grounds', 'Campus and Infrastructure', 'Tour of our serene, eco-friendly school grounds, well-ventilated classrooms, play courts, and composite laboratories.', '2026-02-01', 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200', true, true, 9)
ON CONFLICT (slug) DO NOTHING;

-- 5. Sample Faculty
INSERT INTO public.faculty (name, designation, qualification, subjects, department, experience_years, photo_url, display_order, is_active) VALUES
('Dr. K. Sarabha Reddy', 'Chairman & Founder', 'M.A., Ph.D.', 'Educational Vision & Leadership', 'Leadership', 25, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400', 1, true),
('Mrs. S. V. Lakshmi', 'Principal', 'M.Sc., M.Ed., M.Phil.', 'School Administration & Educational Leadership', 'Leadership', 18, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400', 2, true),
('Mr. V. Ramanjaneyulu', 'Academic Coordinator & Senior Faculty', 'M.Sc. (Mathematics), B.Ed.', 'Mathematics (Classes IX - X)', 'Secondary School', 14, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400', 3, true),
('Mrs. P. Radhika', 'Senior Science Faculty', 'M.Sc. (Physics), B.Ed.', 'Physics & Science Laboratory', 'Secondary School', 11, 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400', 4, true),
('Mr. B. Suresh Kumar', 'Faculty of English & Communication', 'M.A. (English Literature), B.Ed.', 'English Language & Literary Club', 'Secondary School', 10, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', 5, true),
('Mrs. G. Sujatha', 'Faculty of Social Sciences', 'M.A. (History & Pol. Sc.), B.Ed.', 'Social Studies & Civics', 'Middle School', 8, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400', 6, true),
('Mr. T. Srinivas', 'Faculty of Computer Science', 'MCA, B.Sc.', 'Computer Science & AI Basics', 'Middle School', 7, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400', 7, true),
('Mrs. M. Anitha', 'Primary Wing Coordinator', 'B.Sc., B.Ed., D.El.Ed.', 'Foundational Numeracy & Science', 'Primary School', 9, 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400', 8, true),
('Mrs. R. Kavitha', 'Pre-Primary Head', 'NTT Certified, B.A.', 'Early Childhood Development & Phonics', 'Pre-Primary', 8, 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=400', 9, true),
('Mr. M. Rajesh', 'Physical Education Director', 'B.P.Ed., M.P.Ed.', 'Physical Education, Athletics & Yoga', 'Special Activity', 12, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400', 10, true)
ON CONFLICT DO NOTHING;

-- 6. Sample Notices
INSERT INTO public.notices (title, circular_number, notice_date, category, file_url, is_important, is_published) VALUES
('Admissions Open for Academic Year 2025-26', 'JVN/ADM/2025/01', '2025-01-10', 'Admissions', '/downloads', true, true),
('CBSE Board Examination Schedule for Class X', 'JVN/EXAM/2025/08', '2025-01-22', 'Examinations', '/academics/examinations', true, true),
('Schedule for Formative Assessment - IV (FA-4)', 'JVN/EXAM/2025/09', '2025-02-05', 'Examinations', '/academics/examinations', false, true),
('Annual Sports Meet 2026 Participation & Guidelines', 'JVN/ACT/2026/02', '2026-01-08', 'Sports', '/news-events', false, true),
('Parent-Teacher Association Meeting Announcement', 'JVN/GEN/2026/03', '2026-02-02', 'General', '/notice-board', true, true),
('Summer Vacation & Reopening Dates Announcement', 'JVN/GEN/2025/12', '2025-04-15', 'Holidays', '/academics/calendar', false, true)
ON CONFLICT DO NOTHING;

-- 7. Mandatory Public Disclosure
INSERT INTO public.disclosure_documents (category, document_title, document_url, file_size, last_updated, sort_order) VALUES
('A: GENERAL INFORMATION', 'School Name: Jyothi Vidya Niketan E.M. High School', '#info', 'Official Info', '2025-06-01', 1),
('A: GENERAL INFORMATION', 'CBSE Affiliation Number: 130603', '#info', 'CBSE Verified', '2025-06-01', 2),
('A: GENERAL INFORMATION', 'School Code: 57218', '#info', 'State Code', '2025-06-01', 3),
('A: GENERAL INFORMATION', 'Complete Address: Survey No: 872/2 & 872/3, Jammalamadugu Road, Koilakuntla, Andhra Pradesh - 518134', '#info', 'Registered Address', '2025-06-01', 4),
('A: GENERAL INFORMATION', 'Principal Name & Qualification: Mrs. S. V. Lakshmi (M.Sc., M.Ed., M.Phil.)', '#info', 'Official Info', '2025-06-01', 5),
('A: GENERAL INFORMATION', 'School Email: jyothividyaniketan@gmail.com', '#info', 'Official Email', '2025-06-01', 6),
('A: GENERAL INFORMATION', 'Contact Details: +91 7997999863, +91 7997999864', '#info', 'Official Helpline', '2025-06-01', 7),
('B: DOCUMENTS AND INFORMATION', 'Copies of Affiliation / Upgradation Letter and Recent Extension of Affiliation', '/docs/CBSE_Affiliation_Grant_Letter.pdf', '1.4 MB', '2025-04-10', 8),
('B: DOCUMENTS AND INFORMATION', 'Copies of Societies / Trust / Company Registration / Renewal Certificate', '/docs/Trust_Registration_Certificate.pdf', '980 KB', '2025-03-15', 9),
('B: DOCUMENTS AND INFORMATION', 'Copy of No Objection Certificate (NOC) Issued by the State Govt.', '/docs/State_Govt_NOC.pdf', '850 KB', '2025-02-20', 10),
('B: DOCUMENTS AND INFORMATION', 'Copies of Recognition Certificate Under RTE Act, 2009', '/docs/RTE_Recognition_Certificate.pdf', '1.1 MB', '2025-02-18', 11),
('B: DOCUMENTS AND INFORMATION', 'Copy of Valid Building Safety Certificate as per National Building Code', '/docs/Building_Safety_Certificate.pdf', '750 KB', '2025-01-25', 12),
('B: DOCUMENTS AND INFORMATION', 'Copy of Valid Fire Safety Certificate Issued by Competent Authority', '/docs/Fire_Safety_Certificate.pdf', '620 KB', '2025-01-28', 13),
('B: DOCUMENTS AND INFORMATION', 'Copy of Self-Declaration Certificate Submitted by School for Affiliation', '/docs/Self_Declaration_Affiliation.pdf', '1.2 MB', '2025-03-01', 14),
('B: DOCUMENTS AND INFORMATION', 'Copies of Valid Water, Health and Sanitation Certificates', '/docs/Water_Sanitation_Certificate.pdf', '810 KB', '2025-01-30', 15),
('C: RESULT AND ACADEMICS', 'Fee Structure of the School (Class-wise)', '/docs/Fee_Structure_2025_26.pdf', '450 KB', '2025-04-01', 16),
('C: RESULT AND ACADEMICS', 'Annual Academic Calendar (2025-2026)', '/docs/Academic_Calendar_2025_26.pdf', '1.8 MB', '2025-04-05', 17),
('C: RESULT AND ACADEMICS', 'List of School Management Committee (SMC)', '/docs/School_Management_Committee.pdf', '520 KB', '2025-03-10', 18),
('C: RESULT AND ACADEMICS', 'List of Parents Teachers Association (PTA) Members', '/docs/PTA_Members_List.pdf', '480 KB', '2025-03-12', 19),
('C: RESULT AND ACADEMICS', 'Three-Year Result of the Board Examination (Class X)', '/docs/Class_X_Three_Year_Results.pdf', '540 KB', '2025-05-20', 20),
('D: STAFF (TEACHING)', 'Principal: 01 | Total No. of Teachers: 32 | PGT: 0 | TGT: 14 | PRT: 12 | NTT: 06', '#staff', 'Staff Summary', '2025-06-01', 21),
('D: STAFF (TEACHING)', 'Teachers Section Ratio: 1.5:1 | Special Educator: 01 | Counselor & Wellness: 01', '#staff', 'Staff Compliance', '2025-06-01', 22),
('E: SCHOOL INFRASTRUCTURE', 'Total Campus Area: 8,093 Sq. Meters (2.0 Acres) | Built-up Area: 3,450 Sq. Meters', '#infra', 'Campus Metrics', '2025-06-01', 23),
('E: SCHOOL INFRASTRUCTURE', 'Total Classrooms: 24 (Well ventilated, smart enabled, 500+ sq. ft each)', '#infra', 'Classrooms', '2025-06-01', 24),
('E: SCHOOL INFRASTRUCTURE', 'Laboratories: Composite Science Lab (1), Computer Lab (1), Maths Lab (1), Library (1)', '#infra', 'Lab Details', '2025-06-01', 25),
('E: SCHOOL INFRASTRUCTURE', 'Internet Facility: High-Speed Fiber 100 Mbps | CCTVs Installed: 48 Cameras across campus', '#infra', 'Digital Safety', '2025-06-01', 26)
ON CONFLICT DO NOTHING;

-- 8. Testimonials
INSERT INTO public.testimonials (name, role, quote, rating, sort_order) VALUES
('M. Venkata Subbaiah', 'Parent of Class X Student', 'Jyothi Vidya Niketan has provided our son with top-quality CBSE education right here in Koilakuntla. The teachers give individual attention and the discipline is exemplary.', 5, 1),
('S. Lakshmi Prasanna', 'Parent of Class VI Student', 'The smart classrooms and focus on spoken English have given our daughter tremendous confidence. The sports facilities and library are outstanding.', 5, 2),
('K. Surendra Reddy', 'Parent of Class III Student', 'We are extremely pleased with the pre-primary and primary teaching methodology. The children learn through activities without feeling overburdened.', 5, 3),
('Dr. B. Nagaraju', 'Educationist & Community Member', 'Jyothi Vidya Niketan stands as a beacon of academic excellence in Kurnool and Nandyal district. Their transparent administration and CBSE compliance are commendable.', 5, 4)
ON CONFLICT DO NOTHING;

-- 9. FAQ Items
INSERT INTO public.faq_items (question, answer, category, sort_order) VALUES
('What curriculum does Jyothi Vidya Niketan follow?', 'Jyothi Vidya Niketan E.M. High School follows the Central Board of Secondary Education (CBSE) curriculum, New Delhi (Affiliation Number 130603), from Pre-Primary through Class X.', 'Academics', 1),
('What is the admission procedure for the new academic year?', 'Parents can apply online via our Admission Enquiry portal or visit the school campus on Jammalamadugu Road, Koilakuntla. The process involves submitting the application form, interaction/diagnostic assessment, and document verification.', 'Admissions', 2),
('What are the school timings?', 'Pre-Primary (Nursery, LKG, UKG): 8:45 AM to 1:00 PM. Primary & Middle School (Classes I - VIII): 8:45 AM to 4:00 PM. Secondary School (Classes IX - X): 8:30 AM to 5:00 PM (includes special study hours).', 'General', 3),
('Is transport facility available for nearby villages and areas?', 'Yes, the school maintains a fleet of safe buses covering Koilakuntla town and surrounding villages with trained drivers and bus attendants.', 'Facilities', 4),
('What extra-curricular activities are offered?', 'Students participate in athletics, cricket, volleyball, yoga, karate, classical & folk dance, music, debate, science fairs, and art competitions.', 'Activities', 5),
('What safety measures are implemented on campus?', 'The campus has 24/7 CCTV surveillance, boundary walls, fire safety systems, dedicated security personnel, and purified reverse osmosis (RO) drinking water.', 'Facilities', 6)
ON CONFLICT DO NOTHING;

