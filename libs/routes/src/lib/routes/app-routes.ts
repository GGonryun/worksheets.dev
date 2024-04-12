import { Author } from '@worksheets/util/blog';
import {
  AccountFriendsQueryParams,
  FriendsPanels,
  HelpAccountQuestions,
  HelpCommonQuestions,
  HelpContributionsQuestions,
  HelpDevelopersQuestions,
  HelpEmailsQuestions,
  HelpFriendsQuestions,
  HelpInventoryQuestions,
  HelpMobsQuestions,
  HelpNotificationsQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
  HelpQuestsQuestions,
  HelpReferralsQuestions,
  HelpTokensQuestions,
  HelpVIPQuestions,
  InventoryPanels,
  LoginQueryParams,
  NewsletterQueryParams,
  RafflesQueryParams,
  ReferralsPanels,
  SettingsPanels,
} from '@worksheets/util/enums';

import { routeBuilder } from '../util';

const CHARITY_GAMES_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ||
    process.env['CHARITY_GAMES_BASE_URL'] ||
    process.env['BASE_URL']) ??
  '';

if (!CHARITY_GAMES_BASE_URL) {
  throw new Error('Failed to build routes: CHARITY_GAMES_BASE_URL is required');
}

const createRoute = routeBuilder(CHARITY_GAMES_BASE_URL);

export const routes = {
  baseUrl: CHARITY_GAMES_BASE_URL,
  home: createRoute({
    path: '/',
  }),
  about: createRoute({
    path: '/about',
    bookmarks: Author,
  }),
  contact: createRoute({
    path: '/contact',
  }),
  category: createRoute({
    path: '/tags/[tagId]',
  }),
  categories: createRoute({
    path: '/tags',
  }),
  referral: createRoute({
    path: '/ref/[code]',
  }),
  library: createRoute({
    path: '/library',
  }),
  play: createRoute({
    path: '/play',
    routes: {
      random: createRoute({
        path: '/play/random',
      }),
    },
  }),
  game: createRoute({
    path: '/play/[gameId]',
  }),
  developer: createRoute({
    path: '/developers/[developerId]',
  }),
  terms: createRoute({
    path: '/terms',
  }),
  privacy: createRoute({
    path: '/privacy',
  }),
  cookies: createRoute({
    path: '/cookies',
  }),
  signUp: createRoute({
    path: '/signup',
  }),
  portal: createRoute({
    path: '/portal',
  }),
  login: createRoute({
    path: '/login',
    query: LoginQueryParams,
  }),
  logout: createRoute({
    path: '/logout',
  }),
  newsletter: createRoute({
    path: '/newsletter',
    routes: {
      confirm: createRoute({
        path: '/newsletter/confirm',
        query: NewsletterQueryParams,
      }),
      subscribe: createRoute({
        path: '/newsletter/subscribe',
        query: NewsletterQueryParams,
      }),
      unsubscribe: createRoute({
        path: '/newsletter/unsubscribe',
        query: NewsletterQueryParams,
      }),
    },
  }),
  auctions: createRoute({
    path: '/auctions',
  }),
  vip: createRoute({
    path: '/vip',
  }),
  raffle: createRoute({
    path: '/raffles/[raffleId]',
  }),
  raffles: createRoute({
    path: '/raffles',
    query: RafflesQueryParams,
    routes: {
      expired: createRoute({
        path: '/raffles/expired',
      }),
    },
  }),
  mob: createRoute({
    path: '/mob/[mobId]',
  }),
  mobs: createRoute({
    path: '/mobs',
    routes: {
      history: createRoute({
        path: '/mobs/history',
      }),
    },
  }),
  help: createRoute({
    path: '/help',
    routes: {
      faq: createRoute({
        path: '/help/faq',
        bookmarks: HelpCommonQuestions,
      }),
      accounts: createRoute({
        path: '/help/accounts',
        bookmarks: HelpAccountQuestions,
      }),
      tokens: createRoute({
        path: '/help/tokens',
        bookmarks: HelpTokensQuestions,
      }),
      playingGames: createRoute({
        path: '/help/playing-games',
        bookmarks: HelpPlayingGamesQuestions,
      }),
      referrals: createRoute({
        path: '/help/referrals',
        bookmarks: HelpReferralsQuestions,
      }),
      friends: createRoute({
        path: '/help/friends',
        bookmarks: HelpFriendsQuestions,
      }),
      notifications: createRoute({
        path: '/help/notifications',
        bookmarks: HelpNotificationsQuestions,
      }),
      emails: createRoute({
        path: '/help/emails',
        bookmarks: HelpEmailsQuestions,
      }),
      vip: createRoute({
        path: '/help/vip',
        bookmarks: HelpVIPQuestions,
      }),
      prizes: createRoute({
        path: '/help/prizes',
        bookmarks: HelpPrizesQuestions,
      }),
      contributions: createRoute({
        path: '/help/contributions',
        bookmarks: HelpContributionsQuestions,
      }),
      developers: createRoute({
        path: '/help/developers',
        bookmarks: HelpDevelopersQuestions,
      }),
      inventory: createRoute({
        path: '/help/inventory',
        bookmarks: HelpInventoryQuestions,
      }),
      quests: createRoute({
        path: '/help/quests',
        bookmarks: HelpQuestsQuestions,
      }),
      mobs: createRoute({
        path: '/help/mobs',
        bookmarks: HelpMobsQuestions,
      }),
    },
  }),
  account: createRoute({
    path: '/account',
    bookmarks: SettingsPanels,
    routes: {
      submissions: createRoute({
        path: '/account/submissions',
        routes: {
          create: createRoute({
            path: '/account/submissions/new',
          }),
          edit: createRoute({
            path: '/account/submissions/edit/[submissionId]',
          }),
          success: createRoute({
            path: '/account/submissions/success',
          }),
        },
      }),
      quests: createRoute({
        path: '/account/quests',
      }),
      referrals: createRoute({
        path: '/account/referrals',
        bookmarks: ReferralsPanels,
      }),
      friends: createRoute({
        path: '/account/friends',
        bookmarks: FriendsPanels,
        query: AccountFriendsQueryParams,
      }),
      inventory: createRoute({
        path: '/account/inventory',
        bookmarks: InventoryPanels,
      }),
      notifications: createRoute({
        path: '/account/notifications',
      }),
      integrations: createRoute({
        path: '/account/integrations',
      }),
    },
  }),
  ref: createRoute({
    path: '/ref/[code]',
  }),
};
