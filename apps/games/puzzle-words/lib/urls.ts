import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  home: () => '/',
  puzzle: () => `/puzzle`,
  freeRice: () => 'https://freerice.com/',
  waterOrg: () => 'https://www.water.org/',
  charityWater: () => 'https://www.charitywater.org/',
  fullstory: () => 'https://www.fullstory.com/',
  worksheets: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL(),
  games: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/games'),
  contact: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/contact'),
  subscribe: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/subscribe'),
};
