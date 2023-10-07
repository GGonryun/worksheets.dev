import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  home: () => '/',
  puzzle: () => `/puzzle`,
  worksheets: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL(),
  games: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/games'),
  contact: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/contact'),
  subscribe: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/subscribe'),
};
