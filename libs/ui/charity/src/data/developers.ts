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
    id: 'arcare-bomb',
    name: 'Arcare Bomb',
    socials: {
      website: 'https://gamemonetize.com/games?company=ArcareBomb#gamesall',
    },
  },
];
