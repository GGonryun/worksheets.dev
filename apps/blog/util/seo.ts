import { blogRoutes, routes } from '@worksheets/routes';
import { OpenGraphProps, TWITTER_SEO } from '@worksheets/util/seo';
import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { ArticleJsonLdProps, DefaultSeoProps, NextSeoProps } from 'next-seo';

export const defaultSeo: DefaultSeoProps = {
  canonical: blogRoutes.baseUrl,
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
        url: `${blogRoutes.baseUrl}/og-image.png`,
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

const createSeo = ({ noindex, ...props }: OpenGraphProps): NextSeoProps => ({
  canonical: blogRoutes.baseUrl + props.path,
  title: props.title,
  noindex: noindex ?? false,
  titleTemplate: `%s | ${defaultSeo.title}`,
  defaultTitle: defaultSeo.title,
  openGraph: {
    ...props,
    url: blogRoutes.baseUrl + props.path,
    siteName: defaultSeo.title,
  },
});

export const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: defaultSeo.title,
  url: blogRoutes.baseUrl,
  alternateName: [
    'Blog.Charity.Games',
    'CharityGamesBlog',
    'Charity Games Blog',
  ],
  description: defaultSeo.description,
};

export const blogArticleSeo = (slug: string, metadata: MarkdownMetadata) =>
  createSeo({
    path: blogRoutes.article.path({ params: { slug } }),
    title: metadata.title,
    description: metadata.excerpt,
    type: 'article',
    article: {
      publishedTime: metadata.date,
      modifiedTime: metadata.date,
      authors: [routes.about.url()],
      tags: metadata.tags,
    },
    images: [
      {
        url: metadata.coverImage,
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
  url: blogRoutes.article.path({ params: { slug } }),
  title: metadata.title,
  images: [metadata.coverImage],
  datePublished: metadata.date,
  dateModified: metadata.date,
  authorName: author.name,
  description: metadata.excerpt,
});

export const blogSeo = createSeo({
  title: `Charity Games - Blog`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
});
