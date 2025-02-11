import './styles.css';

import { marketingRoutes } from '@worksheets/routes';
import { MarketingLayout } from '@worksheets/ui/layouts/marketing/server';
import { TWITTER_SEO } from '@worksheets/util/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charity Games',
  description:
    'On Charity Games you can play online browser games and win free prizes. Turn your game time into money for charitable causes.',
  openGraph: {
    type: 'website',
    siteName: 'Charity Games',
    description:
      'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
    images: [
      {
        url: `${marketingRoutes.home.url()}/og-image.png`,
        width: 978,
        height: 800,
        alt: 'Charity Games Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: TWITTER_SEO,
  robots: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
  },
  applicationName: 'Charity Games',
  creator: 'Miguel Campos',
  keywords:
    'charity, games, browser, html, free, play, donate, arcade, prizes, html5, web, online, mobile, desktop, microgames, micro, casual, indie, developer, charity games, charitygames, charity.games, charity-games, charity-games',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Charity Games',
  },
};

export default MarketingLayout;
