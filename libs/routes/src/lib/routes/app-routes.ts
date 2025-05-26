import { Author } from '@worksheets/util/blog';
import {
  HelpAccountQuestions,
  HelpCommonQuestions,
  HelpContributionsQuestions,
  HelpDevelopersQuestions,
  HelpEmailsQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
  HelpReferralsQuestions,
  LoginQueryParams,
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
  sitemap: createRoute({
    path: '/sitemap.xml',
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
    routes: {
      version: createRoute({
        path: '/play/[gameId]/[version]',
      }),
    },
  }),
  teams: createRoute({
    path: '/teams',
  }),
  team: createRoute({
    path: '/teams/[teamId]',
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
      playingGames: createRoute({
        path: '/help/playing-games',
        bookmarks: HelpPlayingGamesQuestions,
      }),
      referrals: createRoute({
        path: '/help/referrals',
        bookmarks: HelpReferralsQuestions,
      }),
      emails: createRoute({
        path: '/help/emails',
        bookmarks: HelpEmailsQuestions,
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
