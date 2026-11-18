import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AnnouncementTicker from '@/components/common/AnnouncementTicker';
import AnnouncementPopup from '@/components/common/AnnouncementPopup';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import { dataService } from '@/lib/data/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jyothividyaniketan.vercel.app';

export const viewport: Viewport = {
  themeColor: '#1b365d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jyothi Vidya Niketan | CBSE School in Koilakuntla, Andhra Pradesh',
    template: '%s | Jyothi Vidya Niketan E.M. High School',
  },
  description:
    'Discover Jyothi Vidya Niketan E.M. High School in Koilakuntla, Andhra Pradesh (CBSE Affiliation 130603). Offering top-tier academics, smart classrooms, sports, and holistic development.',
  keywords: [
    'Jyothi Vidya Niketan',
    'Jyothi Vidya Niketan School',
    'Jyothi Vidya Niketan E.M. High School',
    'Jyothi Vidya Niketan Koilakuntla',
    'CBSE School in Koilakuntla',
    'English Medium School in Koilakuntla',
    'School in Koilakuntla',
    'School in Kurnool District',
    'School in Nandyal District',
    'Admissions at Jyothi Vidya Niketan',
  ],
  authors: [{ name: 'Jyothi Vidya Niketan E.M. High School' }],
  creator: 'Jyothi Vidya Niketan',
  publisher: 'Sarabha Reddy Educational Society',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Jyothi Vidya Niketan E.M. High School',
    title: 'Jyothi Vidya Niketan | CBSE School in Koilakuntla, Andhra Pradesh',
    description:
      'Premier CBSE English Medium School in Koilakuntla. Admissions open for Nursery to Class X.',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Jyothi Vidya Niketan School Emblem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jyothi Vidya Niketan | CBSE School in Koilakuntla',
    description: 'Premier CBSE English Medium School in Koilakuntla, Andhra Pradesh.',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await dataService.getSiteSettings();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}/#organization`,
    name: 'Jyothi Vidya Niketan E.M. High School',
    alternateName: ['Jyothi Vidya Niketan', 'JVN Koilakuntla'],
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/logo.png`,
    description:
      'A premier CBSE Affiliated English Medium School (Affiliation No: 130603) located in Koilakuntla, Andhra Pradesh.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Survey No: 872/2 & 872/3, Jammalamadugu Road',
      addressLocality: 'Koilakuntla',
      addressRegion: 'Andhra Pradesh',
      postalCode: '518134',
      addressCountry: 'IN',
    },
    telephone: settings.primary_phone,
    email: settings.primary_email,
    foundingDate: '2018',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Sarabha Reddy Educational Society',
    },
    sameAs: [
      settings.google_maps_url,
      settings.facebook_url,
      settings.instagram_url,
      settings.youtube_url,
      settings.linkedin_url,
    ].filter(Boolean),
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'Jyothi Vidya Niketan E.M. High School',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/gallery?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {settings.google_verification_code && (
          <meta name="google-site-verification" content={settings.google_verification_code} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-white">
        <AnnouncementTicker
          text={settings.ticker_text}
          bulletinItems={settings.bulletin_items}
          enabled={settings.ticker_enabled}
        />
        <Header settings={settings} />
        <main className="flex-1 w-full">{children}</main>
        <Footer settings={settings} />
        <AnnouncementPopup
          enabled={settings.popup_enabled}
          title={settings.popup_title}
          message={settings.popup_message}
          link={settings.popup_link}
          imageUrl={settings.popup_image_url}
          badge={settings.popup_badge}
          ctaText={settings.popup_cta_text}
        />
        <FloatingWhatsApp
          phoneNumber={settings.whatsapp_number}
          defaultMessage={settings.whatsapp_default_message}
          enabled={settings.whatsapp_enabled}
        />
      </body>
    </html>
  );
}

