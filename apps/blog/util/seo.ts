import { BLOG_BASE_URL, CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { OpenGraphProps, TWITTER_SEO } from '@worksheets/util/seo';
import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { ArticleJsonLdProps, DefaultSeoProps, NextSeoProps } from 'next-seo';

export const defaultSeo: DefaultSeoProps = {
  title: 'Charity Games Blog',
  description:
    'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
  openGraph: {
    type: 'website',
    siteName: 'Charity Games Blog',
    description:
      'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
    images: [
      {
        url: `${BLOG_BASE_URL}/og-image.png`,
        width: 978,
        height: 800,
        alt: 'Charity Games Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: TWITTER_SEO,
  robotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1,
  },
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: 'Miguel Campos',
    },
    {
      name: 'application-name',
      content: 'Charity Games',
    },
    {
      name: 'keywords',
      content:
        'charity, games, browser, html, free, play, donate, arcade, prizes, html5, web, online, mobile, desktop, microgames, micro, casual, indie, developer, charity games, charitygames, charity.games, charity-games, charity-games',
    },
  ],
};

const createCanonicalUrl = (url?: string) => `${BLOG_BASE_URL}${url}`;

const createSeo = ({ noindex, ...props }: OpenGraphProps): NextSeoProps => ({
  canonical: createCanonicalUrl(props.url),
  title: props.title,
  noindex: noindex ?? false,
  defaultTitle: 'Charity Games Blog',
  openGraph: {
    ...props,
    siteName: 'Charity Games Blog',
  },
});

export const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: defaultSeo.title,
  url: createCanonicalUrl(),
  alternateName: [
    'Blog.Charity.Games',
    'CharityGamesBlog',
    'Charity Games Blog',
  ],
  description: defaultSeo.description,
};

export const blogArticleSeo = (slug: string, metadata: MarkdownMetadata) => ({
  url: createCanonicalUrl(`/${slug}`),
  title: `${metadata.title} - Charity Games`,
  description: metadata.excerpt,
  type: 'article',
  article: {
    publishedTime: metadata.date,
    modifiedTime: metadata.date,
    authors: [`${CHARITY_GAMES_BASE_URL}/about`],
    tags: metadata.tags,
  },
  images: [
    {
      url: metadata.ogImage.url,
      alt: metadata.title,
    },
  ],
});

export const blogArticleJsonLd = (
  slug: string,
  metadata: MarkdownMetadata,
  author: BlogAuthor
): ArticleJsonLdProps => ({
  type: 'BlogPosting',
  url: createCanonicalUrl(`/${slug}`),
  title: `${metadata.title} - Charity Games`,
  images: [metadata.ogImage.url],
  datePublished: metadata.date,
  dateModified: metadata.date,
  authorName: author.name,
  description: metadata.excerpt,
});

export const blogSeo = createSeo({
  url: createCanonicalUrl(),
  title: `Charity Games - Blog`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
});
