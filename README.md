# Jyothi Vidya Niketan E.M. High School - Complete School CMS & Website

A state-of-the-art, high-performance website and comprehensive content management system built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase for **Jyothi Vidya Niketan E.M. High School**, Koilakuntla, Andhra Pradesh (CBSE Affiliation No: 130603).

## Key Highlights & Features

- **Modern Architecture**: Next.js 14 App Router with static generation, server-side rendering, and server actions.
- **Institutional Identity**: Incorporates official school seal ("A place to learn, A chance to excel", Estd 2018), CBSE 130603 accreditation badges, and primary contact details.
- **Complete Admin CMS**: Single-project administrative dashboard with 15 management modules accessible via a server-protected PIN authentication gate (`130603` or customized).
- **Numbered Pagination**: Clean crawlable URLs (`?page=2&cat=...`), range displays ("Showing 1–12 of 48"), and responsive controls across Galleries, Notices, Events, Achievements, and Faculty.
- **CBSE Mandatory Public Disclosure**: Full compliance with CBSE Appendix IX requirements, categorizing documents from Section A (General Information) through Section E (Infrastructure).
- **Online Admissions Workflow**: Interactive enquiry form storing parent and student submissions directly into Supabase, with status tracking and 1-click CSV export.
- **WhatsApp Integration**: Floating contact trigger and prefilled enquiry messages.
- **Technical Google SEO**:
  - Dynamic XML Sitemap at `/sitemap.xml`
  - Automated `/robots.txt`
  - Canonical URLs on every route
  - Schema.org structured data for `EducationalOrganization`, `WebSite`, `BreadcrumbList`, and `Event`
  - Google Search Console verification support.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

