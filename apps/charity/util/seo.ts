import { ArticleJsonLdProps, DefaultSeoProps, NextSeoProps } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { BlogAuthor, DeveloperSchema, TagSchema } from '@worksheets/util/types';

export type OpenGraphProps = NonNullable<NextSeoProps['openGraph']>;

export const defaultSeo: DefaultSeoProps = {
  title: 'Charity Games',
  description:
    'On Charity Games you can play free online HTML browser games. Every click donates money to charitable causes. Play alone or with friends. We support mobile and desktop games.',
  openGraph: {
    type: 'website',
    siteName: 'Charity Games',
    description:
      'On Charity Games you can play free online HTML browser games. Every click donates money to charitable causes. Play alone or with friends. We support mobile and desktop games.',
    images: [
      {
        url: 'https://www.charity.games/og-image.png',
        width: 978,
        height: 800,
        alt: 'Charity Games Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: TWITTER_SEO,
};

const createSeo = (props: OpenGraphProps): NextSeoProps => ({
  canonical: props.url,
  title: props.title,
  openGraph: {
    ...props,
  },
});

export const aboutSeo = createSeo({
  url: 'https://www.charity.games/about',
  title: 'Charity Games - About Us',
  description:
    'Charity Games provides access to free online HTML browser games. Every game donates money to charitable causes. We support mobile and desktop games. Play your favorite games and help make the world a better place.',
});

export const homeSeo = createSeo({
  url: 'https://www.charity.games/',
  title: 'Charity Games - Free Online Games that Support Charity',
  description:
    'On Charity Games you can play free online HTML browser games that donate money to charitable causes. Play alone or with friends. We support mobile and desktop games.',
});

export const charitySeo = createSeo({
  url: 'https://www.charity.games/charity',
  title: 'Charity Games - Donate by Playing Free Online Games',
  description:
    'Charity Games is a non profit organization that donates money by playing free online browser games.',
});

export const contactSeo = createSeo({
  url: 'https://www.charity.games/contact',
  title: 'Charity Games - Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
});

export const tagsSeo = createSeo({
  url: `https://www.charity.games/tags`,
  title: `Charity Games - All Categories`,
  description: `Find and play your favorite html and browser games for free on Charity Games. The easiest way to donate to charity.`,
});

export const gamesSeo = createSeo({
  url: `https://charity.games/play`,
  title: `Charity Games - All Games`,
  description: `Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.`,
});

export const blogArticleSeo = (slug: string, metadata: MarkdownMetadata) => ({
  url: `https://www.charity.games/blog/${slug}`,
  title: `${metadata.title} - Charity Games`,
  description: metadata.excerpt,
  type: 'article',
  article: {
    publishedTime: metadata.date,
    modifiedTime: metadata.date,
    authors: ['https://charity.games/about'],
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
  url: `https://www.charity.games/blog/${slug}`,
  title: `${metadata.title} - Charity Games`,
  images: [metadata.ogImage.url],
  datePublished: metadata.date,
  dateModified: metadata.date,
  authorName: author.name,
  description: metadata.excerpt,
});

export const blogSeo = createSeo({
  url: `https://www.charity.games/blog/`,
  title: `Charity Games - Blog`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
});

export const helpSeo = createSeo({
  url: 'https://charity.games/help',
  title: 'Charity Games - Get Involved',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
});

export const faqSeo = createSeo({
  url: 'https://charity.games/faq',
  title: 'Charity Games - Frequently Asked Questions',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const developerSeo = (developer: DeveloperSchema): NextSeoProps =>
  createSeo({
    url: `https://www.charity.games/developers/${developer.id}`,
    title: `${developer.name} - Charity Games - Play Free Web Browser Games`,
    description: `Play ${developer.name} games online for free on Charity Games. Turn your games into donations. Help us make a difference.`,
  });

export const donationsSeo = createSeo({
  url: `https://www.charity.games/donations`,
  title: `Charity Games - Donation Receipts`,
  description: `View all donations made by Charity Games. See how much money has been donated to charity. Thank you for your support!`,
});

export const categorySeo = (tag: TagSchema): NextSeoProps =>
  createSeo({
    url: `https://charity.games/tags/${tag.id}`,
    title: `${tag.name} - Play Free Browser Games for Charity`,
    description: `Play ${tag.name} online for free on Charity Games. The easiest way to make a difference. Donate to charity by playing ${tag.name}.`,
  });
