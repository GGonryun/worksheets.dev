import { MARKETING_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(MARKETING_BASE_URL);

export const marketingRoutes = {
  baseUrl: MARKETING_BASE_URL,
  home: createRoute({
    path: '/',
  }),
};
