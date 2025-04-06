import { DEV_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(DEV_BASE_URL);

export const devRoutes = {
  baseUrl: DEV_BASE_URL,
  dashboard: createRoute({
    path: '/dashboard',
  }),
};
