import { routes } from '@worksheets/routes';
import { OpenGraphProps, TWITTER_SEO } from '@worksheets/util/seo';
import {
  DeveloperSchema,
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

export const accountSubmissionsSeo = createSeo({
  noindex: true,
  path: routes.account.submissions.path(),
  title: `Submissions`,
  description: `Manage your Charity Games submissions. View your submission history.`,
});

export const createGameSubmissionSeo = createSeo({
  noindex: true,
  path: routes.account.submissions.create.path(),
  title: `Create Submission`,
  description: `Create a new game submission on Charity Games.`,
});

export const editGameSubmissionSeo = (submissionId: string) =>
  createSeo({
    noindex: true,
    path: routes.account.submissions.edit.path({ params: { submissionId } }),
    title: `Edit Submission`,
    description: `Edit a game submission on Charity Games.`,
  });

export const accountIntegrationsSeo = createSeo({
  noindex: true,
  path: routes.account.integrations.path(),
  title: `Integrations`,
  description: `Manage your Charity Games integrations. Connect your account to other services.`,
});

export const accountNotificationsSeo = createSeo({
  noindex: true,
  path: routes.account.notifications.path(),
  title: `Notifications`,
  description: `Manage your Charity Games notifications. Stay up to date with the latest news and updates.`,
});

export const accountQuestsSeo = createSeo({
  noindex: true,
  path: routes.account.quests.path(),
  title: `Quests`,
  description: `Complete daily, weekly, and monthly quests to earn tokens. Redeem tokens for real world prizes.`,
});

export const accountReferralsSeo = createSeo({
  noindex: true,
  path: routes.account.referrals.path(),
  title: `Referrals`,
  description: `Manage your Charity Games referrals. Earn tokens by referring friends.`,
});

export const accountFriendsSeo = createSeo({
  noindex: true,
  path: routes.account.friends.path(),
  title: `Friends`,
  description: `Manage your Charity Games friends. Earn tokens by sharing gifts with friends.`,
});

export const accountInventorySeo = createSeo({
  noindex: true,
  path: routes.account.inventory.path(),
  title: `Inventory`,
  description: `Manage your Charity Games inventory. View your current items, prizes, and rewards.`,
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

export const helpTokensSeo = createSeo({
  path: routes.help.tokens.path(),
  title: 'Tokens Help Center',
  description:
    'Find answers to questions about tokens on Charity Games. Learn how to earn tokens and redeem them for rewards.',
});

export const helpPlayingGamesSeo = createSeo({
  path: routes.help.playingGames.path(),
  title: 'Games Help Center',
  description:
    'Find answers to questions about playing games on Charity Games. Learn how to play games and earn tokens.',
});

export const helpReferralsSeo = createSeo({
  path: routes.help.referrals.path(),
  title: 'Charity Games - Referrals Help Center',
  description:
    'Find answers to questions about referrals on Charity Games. Learn how to earn tokens by referring friends.',
});

export const helpFriendsSeo = createSeo({
  path: routes.help.friends.path(),
  title: 'Friends Help Center',
  description:
    'Find answers to questions about friends on Charity Games. Learn how to earn tokens by sharing gifts with friends.',
});

export const helpQuestsSeo = createSeo({
  path: routes.help.quests.path(),
  title: 'Quests Help Center',
  description:
    'Find answers to questions about quests on Charity Games. Learn how to earn tokens by completing challenges.',
});

export const helpEmailsSeo = createSeo({
  path: routes.help.emails.path(),
  title: 'Emails Help Center',
  description:
    'Find answers to questions about emails on Charity Games. Learn about the types of emails we send.',
});

export const helpVIPSeo = createSeo({
  path: routes.help.vip.path(),
  title: 'VIP Help Center',
  description:
    'Find answers to questions about VIP membership on Charity Games. Learn how to earn tokens by becoming a VIP.',
});

export const helpNotificationsSeo = createSeo({
  path: routes.help.notifications.path(),
  title: 'Notifications Help Center',
  description:
    'Find answers to questions about notifications on Charity Games. Learn about notification settings and alerts.',
});

export const helpInventorySeo = createSeo({
  path: routes.help.inventory.path(),
  title: 'Inventory Help Center',
  description:
    'Find answers to questions about the inventory on Charity Games. Learn about your digital and physical prizes.',
});

export const helpPrizesSeo = createSeo({
  path: routes.help.prizes.path(),
  title: 'Prizes Help Center',
  description:
    'Find answers to questions about prizes on Charity Games. Learn about redeeming tokens for real world prizes.',
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

export const helpMobsSeo = createSeo({
  path: routes.help.mobs.path(),
  title: 'Boss Fights',
  description:
    'Boss fights are global events where you team up with other players to defeat a powerful boss and earn rewards.',
});

export const rafflesSeo = createSeo({
  path: routes.raffles.path(),
  title: 'Raffles',
  description:
    'Redeem your tokens for raffle entries and win real world prizes. Every token you spend is a donation towards charity. Win free prizes by playing browser games and referring friends',
});

export const raffleSeo = (raffle: RaffleSchema): NextSeoProps =>
  createSeo({
    path: routes.raffle.path({ params: { raffleId: raffle.id } }),
    title: `${raffle.name} Raffle #${raffle.id}`,
    description: `Enter our raffle for a chance to win a free copy of ${raffle.name}. Every token you spend is a donation to charity. Win prizes by playing browser games and referring friends.`,
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
    'View all expired raffles on Charity Games. See what prizes were given away. Every token you spend is a donation towards a better world.',
});

export const vipSeo = createSeo({
  path: routes.vip.path(),
  title: 'VIP Membership',
  description:
    'Join the VIP membership program and receive exclusive benefits. Every token you spend is a donation towards charity. Win free prizes by playing browser games and referring friends',
});

export const unsubscribeSeo = createSeo({
  path: routes.newsletter.unsubscribe.path(),
  title: 'Unsubscribe',
  description:
    'Unsubscribe from the Charity Games newsletter. We are sorry to see you go. We hope you will return soon!',
});

export const subscribeSeo = createSeo({
  path: routes.newsletter.subscribe.path(),
  title: 'Subscribe',
  description:
    'Subscribe to the Charity Games newsletter. Stay up to date with the latest news, updates, and promotions.',
});

export const confirmSubscriptionSeo = createSeo({
  path: routes.newsletter.confirm.path(),
  title: 'Confirm Subscription',
  description:
    'Confirm your subscription to the Charity Games newsletter. Stay up to date with the latest news, updates, and promotions.',
});

export const librarySeo = createSeo({
  path: routes.library.path(),
  title: 'Game Library',
  description:
    'Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.',
});

export const auctionsSeo = createSeo({
  path: routes.auctions.path(),
  title: 'Auctions',
  description:
    'Bid on digital prizes and win free games. Every token you spend is a donation towards charity. Win tokens by playing browser games and completing tasks.',
});
