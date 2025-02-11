import { PLAY_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(PLAY_BASE_URL);

export const playRoutes = {
  home: createRoute({
    path: '/',
  }),
  category: createRoute({
    path: '/tags/[tagId]',
  }),
  categories: createRoute({
    path: '/tags',
  }),
  library: createRoute({
    path: '/library',
  }),
  random: createRoute({
    path: '/random',
  }),
  game: createRoute({
    path: '/[gameId]',
  }),
  developer: createRoute({
    path: '/developers/[developerId]',
  }),
};
