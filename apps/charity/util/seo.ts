import { routes } from '@worksheets/routes';
import { OpenGraphProps, TWITTER_SEO } from '@worksheets/util/seo';
import {
  DeveloperSchema,
  ItemSchema,
  RaffleSchema,
  SerializableGameSchema,
  TagSchema,
} from '@worksheets/util/types';
import { DefaultSeoProps, NextSeoProps, VideoGameJsonLdProps } from 'next-seo';

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
        url: `${routes.baseUrl}/og-image.png`,
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
  url: routes.home.url(),
  alternateName: [
    'Charity.Games',
    'CharityGames',
    'Charity Games',
    'Charity.Games',
  ],
  description: defaultSeo.description,
};

export const createSeo = ({
  noindex,
  ...props
}: OpenGraphProps): NextSeoProps => ({
  canonical: routes.baseUrl + props.path,
  title: props.title,
  titleTemplate: `%s | ${defaultSeo.title}`,
  defaultTitle: defaultSeo.title,
  description: props.description,
  noindex: noindex ?? false,
  openGraph: {
    ...props,
    url: routes.baseUrl + props.path,
    siteName: 'Charity Games',
  },
});

export const homeSeo = createSeo({
  path: routes.home.path(),
  description:
    'On Charity Games you can play online browser games and win free prizes. Turn your game time into money for charitable causes.',
});

export const aboutSeo = createSeo({
  path: routes.about.path(),
  title: 'About Us',
  description:
    'Charity Games provides access to free online HTML browser games. Every game donates money to charitable causes. Play your favorite games and help make the world a better place.',
});

export const contactSeo = createSeo({
  path: routes.contact.path(),
  title: 'Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
});

export const categoriesSeo = createSeo({
  path: routes.categories.path(),
  title: `All Categories`,
  description: `Find and play your favorite html and browser games for free on Charity Games. The easiest way to donate to charity.`,
});

export const categorySeo = (
  tag: Omit<TagSchema, 'relatedTags'>
): NextSeoProps =>
  createSeo({
    path: routes.category.path({ params: { tagId: tag.id } }),
    title: `${tag.name} Category`,
    description: `Play ${tag.name} online for free on Charity Games. The easiest way to make a difference. Donate to charity by playing ${tag.name}.`,
  });

export const developerSeo = (developer: DeveloperSchema): NextSeoProps =>
  createSeo({
    path: routes.developer.path({ params: { developerId: developer.id } }),
    title: `${developer.name} Profile`,
    description: `Play ${developer.name} games online for free on Charity Games. Turn your games into donations. Help us make a difference.`,
  });

export const playSeo = createSeo({
  path: routes.play.path(),
  title: `All Games`,
  description: `Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.`,
});

export const gameSeo = (
  game: SerializableGameSchema,
  developer: DeveloperSchema
): NextSeoProps =>
  createSeo({
    path: routes.game.path({ params: { gameId: game.id } }),
    title: `Play ${game.name}`,
    description: `Play ${game.name} by ${developer.name} online for free on Charity Games. ${game.name} is one of our top ${game.categories[0]} games. `,
    images: [
      {
        url: game.bannerUrl,
        alt: game.name,
      },
    ],
  });

export const gameJsonLd = (
  game: SerializableGameSchema,
  developer: DeveloperSchema
): VideoGameJsonLdProps => ({
  name: game.name,
  languageName: 'English',
  description: game.description,
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  url: routes.game.url({ params: { gameId: game.id } }),
  keywords: game.categories.join(', '),
  datePublished: game.createdAt,
  image: game.iconUrl,
  publisherName: developer.name,
  producerUrl: routes.developer.path({ params: { developerId: developer.id } }),
});

export const termsSeo = createSeo({
  path: routes.terms.path(),
  title: `Terms of Service`,
  description: `Read the Charity Games terms of service. Learn about our policies and guidelines. Thank you for your support!`,
});

export const privacySeo = createSeo({
  path: routes.privacy.path(),
  title: `Privacy Policy`,
  description: `Read the Charity Games privacy policy. Learn about our data usage and privacy practices. Thank you for your support!`,
});

export const cookiesSeo = createSeo({
  path: routes.cookies.path(),
  title: `Cookies Policy`,
  description: `Read the Charity Games cookies policy. Learn about our cookie usage and privacy practices. Thank you for your support!`,
});

export const accountProfileSeo = createSeo({
  noindex: true,
  path: routes.account.path(),
  title: `Account`,
  description: `Manage your Charity Games account. View your profile and manage your settings.`,
});

export const signUpSeo = createSeo({
  path: routes.signUp.path(),
  title: 'Sign Up',
  description:
    'Sign up for Charity Games and start playing free online HTML browser games. Every play donates money to charitable causes. We support mobile and desktop.',
});

export const loginSeo = createSeo({
  path: routes.login.path(),
  title: 'Log In',
  description:
    'Log in to Charity Games and start playing free online HTML browser games. Every play donates money to charitable causes. We support mobile and desktop.',
});

export const helpCenterSeo = createSeo({
  path: routes.help.path(),
  title: 'Help Center',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const helpFaqSeo = createSeo({
  path: routes.help.faq.path(),
  title: 'Frequently Asked Questions',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
});

export const helpAccountsSeo = createSeo({
  path: routes.help.accounts.path(),
  title: 'Accounts Help Center',
  description:
    'Find answers to questions about accounts, profiles, and settings on Charity Games.',
});

export const helpPlayingGamesSeo = createSeo({
  path: routes.help.playingGames.path(),
  title: 'Games Help Center',
  description:
    'Find answers to questions about playing games on Charity Games. Learn how to play games and earn rewards.',
});

export const helpReferralsSeo = createSeo({
  path: routes.help.referrals.path(),
  title: 'Charity Games - Referrals Help Center',
  description:
    'Find answers to questions about referrals on Charity Games. Learn how to earn bonuses by referring friends.',
});

export const helpEmailsSeo = createSeo({
  path: routes.help.emails.path(),
  title: 'Emails Help Center',
  description:
    'Find answers to questions about emails on Charity Games. Learn about the types of emails we send.',
});

export const helpPrizesSeo = createSeo({
  path: routes.help.prizes.path(),
  title: 'Prizes Help Center',
  description:
    'Find answers to questions about prizes on Charity Games. Learn about real world prizes.',
});
export const helpContributionsSeo = createSeo({
  path: routes.help.contributions.path(),
  title: 'Contributions Help Center',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
});

export const helpDevelopersSeo = createSeo({
  path: routes.help.developers.path(),
  title: 'Developer Help Center',
  description:
    'Find answers to questions about contributing games to the Charity Games Platform. Turn your games into donations.',
});

export const rafflesSeo = createSeo({
  path: routes.raffles.path(),
  title: 'Raffles',
  description:
    'Complete small challenges for raffle entries and win real world prizes. Win free prizes by playing browser games and referring friends',
});

export const raffleSeo = (raffle: RaffleSchema): NextSeoProps =>
  createSeo({
    noindex: true,
    path: routes.raffle.path({ params: { raffleId: raffle.id } }),
    title: `${raffle.name} | Raffle`,
    description:
      'Complete small challenges for raffle entries and win real world prizes. Win free prizes by playing browser games and referring friends',
    images: [
      {
        url: raffle.imageUrl,
        alt: raffle.name,
      },
    ],
  });

export const expiredRafflesSeo = createSeo({
  path: routes.raffles.expired.path(),
  title: 'Expired Raffles',
  description:
    'View all expired raffles on Charity Games. See what prizes were given away. Every game play is a donation towards a better world.',
});

export const librarySeo = createSeo({
  path: routes.library.path(),
  title: 'Game Library',
  description:
    'Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.',
});

export const itemsSeo = createSeo({
  path: routes.items.path(),
  title: 'Items',
  description: 'View all items available on Charity Games.',
});

export const itemSeo = (item: ItemSchema): NextSeoProps =>
  createSeo({
    path: routes.item.path({ params: { itemId: item.id } }),
    title: `${item.name} | Item`,
    description: `View ${item.name} and learn how to use it. Win prizes by playing browser games.`,
  });
