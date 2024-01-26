import { DefaultSeoProps, NextSeoProps } from 'next-seo';

export const TWITTER_SEO: DefaultSeoProps['twitter'] = {
  handle: '@CharityGamesGo',
  site: '@CharityGamesGo',
  cardType: 'summary_large_image',
};

export type OpenGraphProps = NonNullable<
  NextSeoProps['openGraph'] & { noindex?: boolean }
>;
