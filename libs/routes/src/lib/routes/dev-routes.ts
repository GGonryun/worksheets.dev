import { DEV_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(DEV_BASE_URL);

export const devRoutes = {
  baseUrl: DEV_BASE_URL,

  dashboard: createRoute({
    path: '/dashboard',
    routes: {
      games: createRoute({
        path: '/dashboard/games',
        routes: {
          view: createRoute({
            path: '/dashboard/games/[gameId]',
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
      teamSelect: createRoute({
        path: '/dashboard/team-select',
      }),
      settings: createRoute({
        path: '/dashboard/settings',
      }),
      onboarding: createRoute({
        path: '/dashboard/onboarding',
      }),
      notifications: createRoute({
        path: '/dashboard/notifications',
      }),
    },
  }),
};
