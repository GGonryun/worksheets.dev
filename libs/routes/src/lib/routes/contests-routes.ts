import { RafflesQueryParams } from '@worksheets/util/enums';

import { CONTESTS_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(CONTESTS_BASE_URL);

export const contestsRoutes = {
  baseUrl: CONTESTS_BASE_URL,
  home: createRoute({
    path: '/',
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
};
