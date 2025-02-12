import { Author } from '@worksheets/util/blog';
import {
  ConnectIntegrationQueryParams,
  ErrorQueryParams,
  HelpAccountQuestions,
  HelpCommonQuestions,
  HelpContributionsQuestions,
  HelpDevelopersQuestions,
  HelpEmailsQuestions,
  HelpFriendsQuestions,
  HelpIntegrationsQuestions,
  HelpInventoryQuestions,
  HelpNotificationsQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
  HelpQuestsQuestions,
  HelpReferralsQuestions,
  HelpTokensQuestions,
  HelpVIPQuestions,
  LoginQueryParams,
  NewsletterQueryParams,
  RafflesQueryParams,
  RefQueryParams,
  SettingsPanels,
} from '@worksheets/util/enums';

import { APP_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(APP_BASE_URL);

export const routes = {
  baseUrl: APP_BASE_URL,
  home: createRoute({
    path: '/',
  }),
  // used by integrations
  api: createRoute({
    path: '/api',
    routes: {
      oauth: createRoute({
        path: '/api/oauth',
        routes: {
          callback: createRoute({
            path: '/api/oauth/callback',
          }),
        },
      }),
    },
  }),
  // used by login api
  oauth: createRoute({
    path: '/oauth',
    routes: {
      success: createRoute({
        path: '/oauth/success',
      }),
      error: createRoute({
        path: '/oauth/error',
        query: ErrorQueryParams,
      }),
    },
  }),
  connect: createRoute({
    path: '/connect/[providerId]',
    query: ConnectIntegrationQueryParams,
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
    query: LoginQueryParams,
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
  items: createRoute({
    path: '/items',
  }),
  item: createRoute({
    path: '/items/[itemId]',
  }),
  user: createRoute({
    path: '/users/[userId]',
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
      integrations: createRoute({
        path: '/help/integrations',
        bookmarks: HelpIntegrationsQuestions,
      }),
      inventory: createRoute({
        path: '/help/inventory',
        bookmarks: HelpInventoryQuestions,
      }),
      quests: createRoute({
        path: '/help/quests',
        bookmarks: HelpQuestsQuestions,
      }),
    },
  }),
  account: createRoute({
    path: '/account',
    bookmarks: SettingsPanels,
  }),
  ref: createRoute({
    path: '/ref/[code]',
    query: RefQueryParams,
  }),
};
