import {
  ConnectIntegrationQueryParams,
  ErrorQueryParams,
  InventoryPanels,
  LoginQueryParams,
  NewsletterQueryParams,
  RefQueryParams,
  SettingsPanels,
} from '@worksheets/util/enums';

import { PORTAL_BASE_URL, routeBuilder } from '../util';

const createRoute = routeBuilder(PORTAL_BASE_URL);

export const portalRoutes = {
  baseUrl: PORTAL_BASE_URL,
  home: createRoute({
    path: '/',
  }),
  signUp: createRoute({
    path: '/signup',
    query: LoginQueryParams,
  }),
  login: createRoute({
    path: '/login',
    query: LoginQueryParams,
  }),
  logout: createRoute({
    path: '/logout',
  }),
  connect: createRoute({
    path: '/connect/[providerId]',
    query: ConnectIntegrationQueryParams,
  }),
  referral: createRoute({
    path: '/ref/[code]',
    query: RefQueryParams,
  }),
  account: createRoute({
    path: '/account',
    bookmarks: SettingsPanels,
    routes: {
      inventory: createRoute({
        path: '/account/inventory',
        bookmarks: InventoryPanels,
      }),
      notifications: createRoute({
        path: '/account/notifications',
      }),
      integrations: createRoute({
        path: '/account/integrations',
      }),
    },
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

  // used by integrations
  api: createRoute({
    path: '/api',
    routes: {
      oauth: createRoute({
        path: '/api/oauth',
        routes: {
          callback: createRoute({
            path: '/api/oauth/callback',
          }),
        },
      }),
    },
  }),
  // used by login api
  oauth: createRoute({
    path: '/oauth',
    routes: {
      success: createRoute({
        path: '/oauth/success',
      }),
      error: createRoute({
        path: '/oauth/error',
        query: ErrorQueryParams,
      }),
    },
  }),
};
