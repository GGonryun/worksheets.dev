import { Author } from '@worksheets/util/blog';
import {
  HelpAccountQuestions,
  HelpCommonQuestions,
  HelpContributionsQuestions,
  HelpDevelopersQuestions,
  HelpIntegrationsQuestions,
  HelpInventoryQuestions,
  HelpPlayingGamesQuestions,
  HelpPrizesQuestions,
} from '@worksheets/util/enums';

import { HELP_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(HELP_BASE_URL);

export const helpRoutes = {
  baseUrl: HELP_BASE_URL,
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
  terms: createRoute({
    path: '/terms',
  }),
  privacy: createRoute({
    path: '/privacy',
  }),
  cookies: createRoute({
    path: '/cookies',
  }),
  faq: createRoute({
    path: '/faq',
    bookmarks: HelpCommonQuestions,
  }),
  accounts: createRoute({
    path: '/accounts',
    bookmarks: HelpAccountQuestions,
  }),
  playingGames: createRoute({
    path: '/playing-games',
    bookmarks: HelpPlayingGamesQuestions,
  }),
  prizes: createRoute({
    path: '/prizes',
    bookmarks: HelpPrizesQuestions,
  }),
  contributions: createRoute({
    path: '/contributions',
    bookmarks: HelpContributionsQuestions,
  }),
  developers: createRoute({
    path: '/developers',
    bookmarks: HelpDevelopersQuestions,
  }),
  integrations: createRoute({
    path: '/integrations',
    bookmarks: HelpIntegrationsQuestions,
  }),
  inventory: createRoute({
    path: '/inventory',
    bookmarks: HelpInventoryQuestions,
  }),
};
