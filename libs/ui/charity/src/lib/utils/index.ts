import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const animateY = (y: number, delay: number) => ({
  initial: {
    opacity: 0,
    y,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay,
    duration: 0.5,
  },
});

export const urls = {
  freeRice: () => 'https://freerice.com/',
  waterOrg: () => 'https://www.water.org/',
  charityWater: () => 'https://www.charitywater.org/',
  fullstory: () => 'https://www.fullstory.com/',
  worksheets: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL(),
  games: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/games'),
  contact: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/contact'),
  subscribe: () => SERVER_SETTINGS.WEBSITES.MARKETING_URL('/subscribe'),
};
