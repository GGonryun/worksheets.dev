import { DeveloperSchema } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

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
    name: 'GameMonetize',
    socials: {
      website: 'https://gamemonetize.com/',
    },
  },
];
