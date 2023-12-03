import { urls } from '../lib/util';
import { DeveloperSchema } from '../types/developer-schema';

export const developers: DeveloperSchema[] = [
  {
    id: 'charity-games',
    name: 'Charity Games',
    socials: {
      twitter: urls.social.twitter,
    },
  },
  {
    id: 'gamemonetize',
    name: 'Game Monetize',
    socials: {
      website: 'https://gamemonetize.com/',
    },
  },
];
