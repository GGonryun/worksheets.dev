import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import * as games from '@worksheets/ui-games';

export const urls = {
  home: () => '/',
  puzzle: () => `/puzzle`,
  waterOrg: games.urls.waterOrg,
  worksheets: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL(),
  games: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/games'),
  contact: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/contact'),
  subscribe: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/subscribe'),
};
