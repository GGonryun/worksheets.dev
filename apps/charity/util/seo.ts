import {
  ArticleJsonLdProps,
  DefaultSeoProps,
  NextSeoProps,
  VideoGameJsonLdProps,
} from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import {
  BlogAuthor,
  DeveloperSchema,
  GameSchema,
  TagSchema,
} from '@worksheets/util/types';

export type OpenGraphProps = NonNullable<NextSeoProps['openGraph']>;

export const defaultSeo: DefaultSeoProps = {
  title: 'Charity Games',
  description:
    'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
  openGraph: {
    type: 'website',
    siteName: 'Charity Games',
    description:
      'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.',
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
  siteName: 'Charity Games | About',
  title: 'Charity Games - About Us',
  description:
    'Charity Games provides access to free online HTML browser games. Every game donates money to charitable causes. Play your favorite games and help make the world a better place.',
});

export const homeSeo = createSeo({
  url: 'https://www.charity.games/',
  siteName: 'Charity Games',
  title: 'Charity Games - Free Online Games that Support Charity',
  description:
    'On Charity Games you can play free online HTML browser games that donate money to charitable causes. Play your favorite mobile and desktop games.',
});

export const charitySeo = createSeo({
  url: 'https://www.charity.games/charity',
  siteName: 'Charity Games | Charity',
  title: 'Charity Games - Donate by Playing Free Online Games',
  description:
    'Charity Games is an online web arcade that donates money by playing free online browser games. We have hundreds of microgames to choose from. Play with Purpose',
});

export const contactSeo = createSeo({
  url: 'https://www.charity.games/contact',
  siteName: 'Charity Games | Contact',
  title: 'Charity Games - Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
});

export const tagsSeo = createSeo({
  url: `https://www.charity.games/tags`,
  siteName: 'Charity Games | Categories',
  title: `Charity Games - All Categories`,
  description: `Find and play your favorite html and browser games for free on Charity Games. The easiest way to donate to charity.`,
});

export const gamesSeo = createSeo({
  url: `https://charity.games/play`,
  siteName: 'Charity Games | Games',
  title: `Charity Games - All Games`,
  description: `Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.`,
});

export const blogArticleSeo = (slug: string, metadata: MarkdownMetadata) => ({
  url: `https://www.charity.games/blog/${slug}`,
  siteName: `Charity Games | Blog`,
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
  siteName: `Charity Games | Blog`,
  url: `https://www.charity.games/blog/`,
  title: `Charity Games - Blog`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
});

export const helpSeo = createSeo({
  siteName: `Charity Games | Help`,
  url: 'https://www.charity.games/help',
  title: 'Charity Games - Get Involved',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
});

export const faqSeo = createSeo({
  siteName: `Charity Games | FAQ`,
  url: 'https://www.charity.games/faq',
  title: 'Charity Games - Frequently Asked Questions',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const developerSeo = (developer: DeveloperSchema): NextSeoProps =>
  createSeo({
    siteName: `Charity Games | Developers`,
    url: `https://www.charity.games/developers/${developer.id}`,
    title: `${developer.name} - Charity Games - Developer Profile`,
    description: `Play ${developer.name} games online for free on Charity Games. Turn your games into donations. Help us make a difference.`,
  });

export const donationsSeo = createSeo({
  siteName: `Charity Games | Donations`,
  url: `https://www.charity.games/donations`,
  title: `Charity Games - Donation Receipts`,
  description: `View all donations made by Charity Games. See how much money has been donated to charity. Thank you for your support!`,
});

export const categorySeo = (tag: TagSchema): NextSeoProps =>
  createSeo({
    siteName: `Charity Games | Categories`,
    url: `https://www.charity.games/tags/${tag.id}`,
    title: `${tag.name} - Play Free Browser Games for Charity`,
    description: `Play ${tag.name} online for free on Charity Games. The easiest way to make a difference. Donate to charity by playing ${tag.name}.`,
  });

export const gameSeo = (
  game: GameSchema,
  developer: DeveloperSchema
): NextSeoProps =>
  createSeo({
    siteName: `Charity Games | Games`,
    url: `https://www.charity.games/play/${game.id}`,
    title: `${game.name} - Charity Games - Free Online Arcade`,
    description: `Play ${game.name} by ${
      developer.name
    } online for free on Charity Games. ${game.name} is one of our top ${
      game.category
    } games. Supports ${game.platforms.join(' and ')}.`,
    images: [
      {
        url: game.bannerUrl,
        alt: game.name,
      },
    ],
  });

export const gameJsonLd = (
  game: GameSchema,
  developer: DeveloperSchema
): VideoGameJsonLdProps => ({
  name: game.name,
  languageName: 'English',
  description: game.description,
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  url: `https://www.charity.games/play/${game.id}`,
  platformName: game.platforms,
  keywords: game.tags.join(', '),
  datePublished: game.createdAt.toISOString(),
  image: game.iconUrl,
  publisherName: developer.name,
  producerUrl: `https://www.charity.games/developers/${developer.id}`,
});

export const termsSeo = createSeo({
  siteName: `Charity Games | Terms`,
  url: `https://www.charity.games/terms`,
  title: `Charity Games - Terms of Service`,
  description: `Read the Charity Games terms of service. Learn about our policies and guidelines. Thank you for your support!`,
});

export const contributeSeo = createSeo({
  siteName: `Charity Games | Contribute`,
  url: `https://www.charity.games/contribute`,
  title: `Charity Games - Developer Contributions`,
  description: `Learn how to contribute to Charity Games. Help us make a difference. Turn your games into donations.`,
});

export const submitGameSeo = createSeo({
  siteName: `Charity Games | Submit Game`,
  url: `https://www.charity.games/contribute/submit`,
  title: `Charity Games - Submit a Game`,
  description: `Learn how to submit a game to Charity Games. Help us make a difference. Turn your games into donations.`,
});

export const accountSeo = createSeo({
  siteName: `Charity Games | Account`,
  url: `https://www.charity.games/account`,
  title: `Charity Games - Account`,
  description: `Manage your Charity Games account. View your donation history and manage your settings.`,
});
