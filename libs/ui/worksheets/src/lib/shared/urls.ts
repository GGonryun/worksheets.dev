import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const urls = {
  app: {
    home: '/',
    login: '/login',
    connections: '/connections',
    applications: '/applications',
  },
  docs: {
    home: SERVER_SETTINGS.WEBSITES.DOCS_URL(),
    contactUs: SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us'),
  },
};
