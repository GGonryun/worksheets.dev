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
              feedback: createRoute({
                path: '/dashboard/games/[gameId]/feedback',
              }),
            },
          }),
          new: createRoute({
            path: '/dashboard/games/new',
          }),
        },
      }),
      invitations: createRoute({
        path: '/dashboard/invitations/[invitationId]',
      }),
      users: createRoute({
        path: '/dashboard/users',
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
        },
      }),
      notifications: createRoute({
        path: '/dashboard/notifications',
      }),
    },
  }),
};
