import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { Author } from '@worksheets/util/blog';
import {
  AccountFriendsQueryParams,
  FriendsPanels,
  HelpAccountQuestions,
  HelpCommonQuestions,
  HelpContributionsQuestions,
  HelpDevelopersQuestions,
  HelpFriendsQuestions,
  HelpNotificationsQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
  HelpReferralsQuestions,
  HelpTokensQuestions,
  HelpVIPQuestions,
  LoginQueryParams,
  PrizesPanels,
  RafflesQueryParams,
  ReferralsPanels,
  SettingsPanels,
  TokensPanels,
} from '@worksheets/util/enums';

import { routeBuilder } from '../util';

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
  games: createRoute({
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
  notifications: createRoute({
    path: '/notifications',
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
  prizes: createRoute({
    path: '/prizes',
  }),
  prize: createRoute({
    path: '/prizes/[prizeId]',
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
  admin: createRoute({
    path: '/admin',
    routes: {
      codes: createRoute({
        path: '/admin/codes',
      }),
      code: createRoute({
        path: '/admin/codes/[codeId]',
      }),
      games: createRoute({
        path: '/admin/games',
      }),
      game: createRoute({
        path: '/admin/games/[gameId]',
      }),
      prizes: createRoute({
        path: '/admin/prizes',
      }),
      prize: createRoute({
        path: '/admin/prizes/[prizeId]',
      }),
      raffles: createRoute({
        path: '/admin/raffles',
      }),
      raffle: createRoute({
        path: '/admin/raffles/[raffleId]',
      }),
      reports: createRoute({
        path: '/admin/reports',
      }),
      report: createRoute({
        path: '/admin/reports/[reportId]',
      }),
      submissions: createRoute({
        path: '/admin/submissions',
      }),
      submission: createRoute({
        path: '/admin/submissions/[submissionId]',
      }),
      users: createRoute({
        path: '/admin/users',
      }),
      user: createRoute({
        path: '/admin/users/[userId]',
      }),
      winners: createRoute({
        path: '/admin/winners',
      }),
      winner: createRoute({
        path: '/admin/winners/[winnerId]',
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
      tokens: createRoute({
        path: '/account/tokens',
        bookmarks: TokensPanels,
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
      prizes: createRoute({
        path: '/account/prizes',
        bookmarks: PrizesPanels,
      }),
    },
  }),
};
