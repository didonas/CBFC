import { MetadataRoute } from 'next';
import { INITIAL_PLAYERS, INITIAL_MATCHES, INITIAL_PRODUCTS, INITIAL_NEWS } from '@/lib/demo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://churchillbrothers.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/club',
    '/team',
    '/matches',
    '/tickets',
    '/shop',
    '/news',
    '/media',
    '/partners',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const playerRoutes: MetadataRoute.Sitemap = INITIAL_PLAYERS.map((player) => ({
    url: `${baseUrl}/team/${player.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const matchRoutes: MetadataRoute.Sitemap = INITIAL_MATCHES.map((match) => ({
    url: `${baseUrl}/matches/${match.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = INITIAL_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/shop/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = INITIAL_NEWS.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...playerRoutes, ...matchRoutes, ...productRoutes, ...newsRoutes];
}
