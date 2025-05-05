import { DEV_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(DEV_BASE_URL);

export const devRoutes = {
  baseUrl: DEV_BASE_URL,
  teams: createRoute({
    path: '/teams',
    routes: {
      select: createRoute({
        path: '/teams/select',
      }),
      create: createRoute({
        path: '/teams/create',
      }),
      join: createRoute({
        path: '/teams/join/[teamId]',
      }),
    },
  }),
  dashboard: createRoute({
    path: '/dashboard',
    routes: {
      games: createRoute({
        path: '/dashboard/games',
        routes: {
          view: createRoute({
            path: '/dashboard/games/[gameId]',
            routes: {
              details: createRoute({
                path: '/dashboard/games/[gameId]/details',
              }),
              media: createRoute({
                path: '/dashboard/games/[gameId]/media',
              }),
              versions: createRoute({
                path: '/dashboard/games/[gameId]/versions',
              }),
              visibility: createRoute({
                path: '/dashboard/games/[gameId]/visibility',
              }),
            },
          }),
          new: createRoute({
            path: '/dashboard/games/new',
          }),
        },
      }),

      users: createRoute({
        path: '/dashboard/users',
        routes: {
          active: createRoute({
            path: '/dashboard/users/active',
          }),
          pending: createRoute({
            path: '/dashboard/users/pending',
          }),
        },
      }),

      settings: createRoute({
        path: '/dashboard/settings',
        routes: {
          profile: createRoute({
            path: '/dashboard/settings/profile',
          }),
          social: createRoute({
            path: '/dashboard/settings/social',
          }),
          sensitive: createRoute({
            path: '/dashboard/settings/sensitive',
          }),
        },
      }),
      notifications: createRoute({
        path: '/dashboard/notifications',
      }),
    },
  }),
};
