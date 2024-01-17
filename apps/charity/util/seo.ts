import { BASE_URL } from '@worksheets/ui/env';
import { TWITTER_SEO } from '@worksheets/util/seo';
import {
  BlogAuthor,
  DeveloperSchema,
  GameSchema,
  TagSchema,
} from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import {
  ArticleJsonLdProps,
  DefaultSeoProps,
  NextSeoProps,
  VideoGameJsonLdProps,
} from 'next-seo';

const createCanonicalUrl = (url?: string) => `${BASE_URL}${url}`;

export type OpenGraphProps = NonNullable<
  NextSeoProps['openGraph'] & { noindex?: boolean }
>;

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
        url: `${BASE_URL}/og-image.png`,
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

export const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: defaultSeo.title,
  url: createCanonicalUrl(),
  alternateName: [
    'Charity.Games',
    'CharityGames',
    'Charity Games',
    'www.charity.games',
  ],
  description: defaultSeo.description,
};

const createSeo = ({ noindex, ...props }: OpenGraphProps): NextSeoProps => ({
  canonical: createCanonicalUrl(props.url),
  title: props.title,
  noindex: noindex ?? false,
  defaultTitle: 'Charity Games',
  openGraph: {
    ...props,
    siteName: 'Charity Games',
  },
});

export const aboutSeo = createSeo({
  url: '/about',
  title: 'Charity Games - About Us',
  description:
    'Charity Games provides access to free online HTML browser games. Every game donates money to charitable causes. Play your favorite games and help make the world a better place.',
});

export const homeSeo = createSeo({
  url: '/',
  title: 'Charity Games - Free Online Games',
  description:
    'On Charity Games you can play free online HTML browser games that donate money to charitable causes. Play your favorite mobile and desktop games.',
});

export const charitySeo = createSeo({
  url: '/charity',
  title: 'Charity Games - Donate by Playing Free Online Games',
  description:
    'Charity Games is an online web arcade that donates money by playing free online browser games. We have hundreds of microgames to choose from. Play with Purpose',
});

export const contactSeo = createSeo({
  url: '/contact',
  title: 'Charity Games - Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
});

export const tagsSeo = createSeo({
  url: `/tags`,
  title: `Charity Games - All Categories`,
  description: `Find and play your favorite html and browser games for free on Charity Games. The easiest way to donate to charity.`,
});

export const gamesSeo = createSeo({
  url: `/play`,
  title: `Charity Games - All Games`,
  description: `Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.`,
});

export const blogArticleSeo = (slug: string, metadata: MarkdownMetadata) => ({
  url: createCanonicalUrl(`/blog/${slug}`),
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
  url: createCanonicalUrl(`/blog/${slug}`),
  title: `${metadata.title} - Charity Games`,
  images: [metadata.ogImage.url],
  datePublished: metadata.date,
  dateModified: metadata.date,
  authorName: author.name,
  description: metadata.excerpt,
});

export const blogSeo = createSeo({
  url: `/blog`,
  title: `Charity Games - Blog`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
});

export const developerSeo = (developer: DeveloperSchema): NextSeoProps =>
  createSeo({
    url: `/developers/${developer.id}`,
    title: `${developer.name} - Charity Games - Developer Profile`,
    description: `Play ${developer.name} games online for free on Charity Games. Turn your games into donations. Help us make a difference.`,
  });

export const donationsSeo = createSeo({
  url: `/donations`,
  title: `Charity Games - Donation Receipts`,
  description: `View all donations made by Charity Games. See how much money has been donated to charity. Thank you for your support!`,
});

export const categorySeo = (tag: TagSchema): NextSeoProps =>
  createSeo({
    url: `/tags/${tag.id}`,
    title: `${tag.name} - Play Free Browser Games for Charity`,
    description: `Play ${tag.name} online for free on Charity Games. The easiest way to make a difference. Donate to charity by playing ${tag.name}.`,
  });

export const gameSeo = (
  game: GameSchema,
  developer: DeveloperSchema
): NextSeoProps =>
  createSeo({
    url: `/play/${game.id}`,
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
  url: createCanonicalUrl(`/play/${game.id}`),
  platformName: game.platforms,
  keywords: game.tags.join(', '),
  datePublished: game.createdAt.toISOString(),
  image: game.iconUrl,
  publisherName: developer.name,
  producerUrl: createCanonicalUrl(`/developers/${developer.id}`),
});

export const termsSeo = createSeo({
  url: `/terms`,
  title: `Charity Games - Terms of Service`,
  description: `Read the Charity Games terms of service. Learn about our policies and guidelines. Thank you for your support!`,
});

export const submitGameSeo = createSeo({
  url: `/contribute/submit`,
  title: `Charity Games - Submit a Game`,
  description: `Learn how to submit a game to Charity Games. Help us make a difference. Turn your games into donations.`,
});

export const accountProfileSeo = createSeo({
  noindex: true,
  url: `/account`,
  title: `Charity Games - Account`,
  description: `Manage your Charity Games account. View your profile and manage your settings.`,
});

export const accountSubmissionsSeo = createSeo({
  noindex: true,
  url: `/account/submissions`,
  title: `Charity Games - Submissions`,
  description: `Manage your Charity Games submissions. View your submission history.`,
});

export const createGameSubmissionSeo = createSeo({
  noindex: true,
  url: `/account/submit/new`,
  title: `Charity Games - Create Submission`,
  description: `Create a new game submission on Charity Games.`,
});

export const accountTokensSeo = createSeo({
  noindex: true,
  url: `/account/tokens`,
  title: `Charity Games - Tokens`,
  description: `Manage your Charity Games tokens. Earn tokens by playing games and referring friends.`,
});

export const accountReferralsSeo = createSeo({
  noindex: true,
  url: `/account/referrals`,
  title: `Charity Games - Referrals`,
  description: `Manage your Charity Games referrals. Earn tokens by referring friends.`,
});

export const accountFriendsSeo = createSeo({
  noindex: true,
  url: `/account/friends`,
  title: `Charity Games - Friends`,
  description: `Manage your Charity Games friends. Earn tokens by sharing gifts with friends.`,
});

export const helpCenterSeo = createSeo({
  url: '/help',
  title: 'Charity Games - Help Center',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const helpFaqSeo = createSeo({
  url: '/help/faq',
  title: 'Charity Games - Frequently Asked Questions',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const helpAccountsSeo = createSeo({
  url: '/help/accounts',
  title: 'Charity Games - Accounts Help Center',
  description:
    'Find answers to questions about accounts, profiles, and settings on Charity Games.',
});

export const helpPlayingGamesSeo = createSeo({
  url: '/help/playing-games',
  title: 'Charity Games - Games Help Center',
  description:
    'Find answers to questions about playing games on Charity Games. Learn how to play games and earn tokens.',
});

export const helpReferralsSeo = createSeo({
  url: '/help/referrals',
  title: 'Charity Games - Referrals Help Center',
  description:
    'Find answers to questions about referrals on Charity Games. Learn how to earn tokens by referring friends.',
});
export const helpFriendsSeo = createSeo({
  url: '/help/friends',
  title: 'Charity Games - Friends Help Center',
  description:
    'Find answers to questions about friends on Charity Games. Learn how to earn tokens by sharing gifts with friends.',
});

export const helpVIPSeo = createSeo({
  url: '/help/vip',
  title: 'Charity Games - VIP Help Center',
  description:
    'Find answers to questions about VIP membership on Charity Games. Learn how to earn tokens by becoming a VIP.',
});

export const helpAuctionsSeo = createSeo({
  url: '/help/auctions',
  title: 'Charity Games - Auctions Help Center',
  description:
    'Find answers to questions about auctions on Charity Games. Learn about winning real world prizes at the auction house.',
});

export const helpPrizeWallSeo = createSeo({
  url: '/help/prize-wall',
  title: 'Charity Games - Prize Wall Help Center',
  description:
    'Find answers to questions about the prize wall on Charity Games. Learn about redeeming tokens for real world prizes.',
});

export const helpContributionsSeo = createSeo({
  url: '/help/contributions',
  title: 'Charity Games - Contributions Help Center',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
});

export const helpDevelopersSeo = createSeo({
  url: '/help/developers',
  title: 'Charity Games - Developer Help Center',
  description:
    'Find answers to questions about contributing games to the Charity Games Platform. Turn your games into donations.',
});
