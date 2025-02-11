import { playRoutes } from '@worksheets/routes';
import { AppLayout } from '@worksheets/ui/layouts/app/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Charity Games',
    default: 'Help | Charity Games',
  },
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
  openGraph: {
    type: 'website',
    siteName: 'Help | Charity Games',
    description:
      'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
    images: [
      {
        url: `${playRoutes.home.url()}/og-image.png`,
        width: 978,
        height: 800,
        alt: 'Charity Games Logo',
        type: 'image/png',
      },
    ],
  },

  robots: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
  },
};

export default AppLayout;
