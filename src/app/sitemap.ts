import { MetadataRoute } from 'next';
import { dataService } from '@/lib/data/service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jyothividyaniketan.vercel.app';

  // Static core priority pages
  const staticRoutes = [
    '',
    '/about-us',
    '/about-us/principals-message',
    '/about-us/vision-mission',
    '/academics',
    '/academics/pre-primary',
    '/academics/primary-school',
    '/academics/middle-school',
    '/academics/secondary-school',
    '/academics/calendar',
    '/academics/examinations',
    '/campus-facilities',
    '/faculty',
    '/student-life',
    '/achievements',
    '/gallery',
    '/gallery/videos',
    '/news-events',
    '/notice-board',
    '/admissions',
    '/admissions/enquiry',
    '/mandatory-public-disclosure',
    '/downloads',
    '/faq',
    '/contact-us',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/notice-board' || route === '/admissions' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : (route.includes('/admissions') || route === '/mandatory-public-disclosure' ? 0.9 : 0.8),
  }));

  // Dynamic gallery albums
  let albumRoutes: MetadataRoute.Sitemap = [];
  try {
    const albumsResult = await dataService.getAlbums(1, 100);
    albumRoutes = albumsResult.data.map(album => ({
      url: `${baseUrl}/gallery/${album.slug}`,
      lastModified: new Date(album.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (e) {}

  // Dynamic events
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const eventsResult = await dataService.getEvents(1, 100);
    eventRoutes = eventsResult.data.map(event => ({
      url: `${baseUrl}/news-events/${event.slug}`,
      lastModified: new Date(event.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (e) {}

  return [...staticRoutes, ...albumRoutes, ...eventRoutes];
}

