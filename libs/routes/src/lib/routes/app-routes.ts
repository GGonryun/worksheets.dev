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
  HelpNotificationsQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
  HelpQuestsQuestions,
  HelpReferralsQuestions,
  HelpTokensQuestions,
  HelpVIPQuestions,
  LoginQueryParams,
  NewsletterQueryParams,
  PrizesPanels,
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
  prize: createRoute({
    path: '/prizes/[prizeId]',
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
      quests: createRoute({
        path: '/help/quests',
        bookmarks: HelpQuestsQuestions,
        routes: {
          history: createRoute({
            path: '/help/quests/history',
          }),
        },
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
      prizes: createRoute({
        path: '/account/prizes',
        bookmarks: PrizesPanels,
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
