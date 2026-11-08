import type { Metadata } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://churchillbrothers.com'),
  title: 'Churchill Brothers FC Goa | The Red Machines | Official Club Platform',
  description:
    'Official digital platform of Churchill Brothers FC Goa. 2x I-League Champions, Durand Cup winners. Discover first-team squad, fixtures, demo match tickets, and official club merchandise.',
  keywords: [
    'Churchill Brothers FC',
    'The Red Machines',
    'Goa Football',
    'I-League',
    'Fatorda Stadium',
    'Margao',
    'Indian Football',
    'Churchill Brothers Jersey',
  ],
  authors: [{ name: 'Churchill Brothers Football Club Goa' }],
  icons: {
    icon: '/images/club/crest.svg',
    apple: '/images/club/crest.svg',
  },
  openGraph: {
    title: 'Churchill Brothers FC Goa — The Red Machines',
    description: 'Built on History. Driven by Passion. Official Football Club Digital Platform.',
    url: 'https://churchillbrothers.com',
    siteName: 'Churchill Brothers FC Goa',
    images: [
      {
        url: '/images/hero/hero-matchday-floodlights.jpg',
        width: 1200,
        height: 630,
        alt: 'Churchill Brothers FC Goa',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-offWhite text-charcoal font-sans min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white">
        <AppProvider>
          <ScrollProgress />
          <DemoBanner />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
