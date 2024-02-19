import { DefaultSeoProps } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

export const TWITTER_SEO: DefaultSeoProps['twitter'] = {
  handle: '@CharityGamesGo',
  site: '@CharityGamesGo',
  cardType: 'summary_large_image',
};

export type OpenGraphProps = NonNullable<
  Omit<OpenGraph, 'url'> & { path?: string; noindex?: boolean }
>;
