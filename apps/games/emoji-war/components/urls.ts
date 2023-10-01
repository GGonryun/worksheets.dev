import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  home: () => '/',
  charityWater: () => 'https://www.charitywater.org/',
  waterOrg: () => 'https://water.org/',
  worksheets: (path?: string) => SERVER_SETTINGS.WEBSITES.MARKETING_URL(path),
  contact: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/contact'),
};
