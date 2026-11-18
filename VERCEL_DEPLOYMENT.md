# Jyothi Vidya Niketan E.M. High School
## Vercel Deployment & Supabase Production Guide

**Official School Domain:** [https://www.jyothividyaniketan.com/](https://www.jyothividyaniketan.com/)  
**CBSE Affiliation Number:** 130603  
**School Code:** 57218  
**Backend:** Supabase (`izfuuecmwemebaigmfgo`)  

---

### 1. Supabase Database One-Time Setup

1. Open your [Supabase Dashboard](https://supabase.com/dashboard/project/izfuuecmwemebaigmfgo).
2. Go to **SQL Editor** on the left menu.
3. Click **New Query**.
4. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste into the editor.
5. Click **Run**. All 20 tables, Row Level Security (RLS) policies, and performance indexes are created.
6. Open another query, paste [`supabase/seed.sql`](./supabase/seed.sql), and click **Run**. This populates authentic verified school data, faculty, CBSE disclosure records, and sample photo albums.
7. Verify that the **Storage bucket** named `school-assets` exists and is marked **Public** (already provisioned).

---

### 2. Vercel Deployment Steps

1. Push this repository to GitHub or import the project directory into [Vercel](https://vercel.com).
2. During the project configuration on Vercel, set the following **Environment Variables**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://izfuuecmwemebaigmfgo.supabase.co` | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_j6oJ3BdpguMc808ITEBGcQ_9v_y9xVm` | Client-side publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Your Supabase service_role secret key from Supabase Dashboard)* | Server-only admin secret key |
| `NEXT_PUBLIC_SITE_URL` | `https://jyothividyaniketan.vercel.app` | Canonical production domain |
| `ADMIN_SECRET_PIN` | `130603` | Administrator security PIN |
| `ADMIN_SESSION_SECRET` | `jyothi_vidya_niketan_secret_session_2026_super_key_secure` | HMAC cookie session secret |

3. Click **Deploy**. Vercel will automatically build the Next.js app and serve it on the edge network with instant global SSL.
4. Under **Project Settings > Domains**, assign `jyothividyaniketan.com` and `www.jyothividyaniketan.com`.

---

### 3. Administrator Access

- Click the secret book emoji (**📖**) located in the website footer next to the copyright notice, or navigate directly to `/admin`.
- Enter the security PIN: **`130603`** (or your custom PIN set in `ADMIN_SECRET_PIN`).
- You have access to all 15 management modules:
  - Hero & Homepage Management
  - Gallery & Album Management with photo lightbox
  - Admissions & Enquiries with 1-click CSV export
  - Notice Board, Circulars, and Top Ticker
  - Academic Calendars and Examination updates
  - Faculty directory
  - CBSE Mandatory Public Disclosure Manager (Categories A to E)
  - SEO Settings & Google Search Console verification tag
  - WhatsApp Helpline configuration
  - Facilities, Achievements, Events, FAQs, and Downloads
  - System Audit Logs

