import { API_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(API_BASE_URL);

export const apiRoutes = {
  baseUrl: API_BASE_URL,
  oauth: createRoute({
    path: '/oauth',
    routes: {
      callback: createRoute({
        path: '/oauth/callback',
      }),
    },
  }),
};
