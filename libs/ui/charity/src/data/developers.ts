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
];
