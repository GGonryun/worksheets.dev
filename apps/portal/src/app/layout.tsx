import { portalRoutes } from '@worksheets/routes';
import { AppLayout } from '@worksheets/ui/layouts/app/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Charity Games',
    default: 'Portal | Charity Games',
  },
  description:
    'On Charity Games you can play online browser games and win free prizes. Turn your game time into money for charitable causes.',
  openGraph: {
    type: 'website',
    siteName: 'Charity Games',
    description:
      'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
    images: [
      {
        url: `${portalRoutes.home.url()}/og-image.png`,
        width: 978,
        height: 800,
        alt: 'Charity Games Logo',
        type: 'image/png',
      },
    ],
  },
};

export default AppLayout;
