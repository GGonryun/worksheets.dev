import { DeveloperSchema } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

export const developers: DeveloperSchema[] = [
  {
    id: 'charity-games',
    name: 'Charity Games',
    avatarUrl: 'https://cdn.charity.games/_developers/charity-games.png',
    description:
      'Charity Games is developing games that raise money for charity. We believe everyone should have access to clean water!',
    socials: {
      twitter: urls.social.twitter,
    },
  },
  {
    id: 'gamemonetize',
    name: 'GameMonetize',
    avatarUrl: 'https://cdn.charity.games/_developers/gamemonetize.png',
    description:
      'GameMonetize is a game publishing company that shows ads in games.',
    socials: {
      website: 'https://gamemonetize.com/',
    },
  },
  {
    id: 'wmgcat',
    name: 'wmgcat',
    avatarUrl: 'https://cdn.charity.games/_developers/wmgcat.png',
    description:
      'I am a game developer and artist, on this page you can see the projects that I develop for game jams or for myself. The main platform for my games is the web, it allows you to play my games on any device that supports javascript!',
    socials: {
      itchio: 'https://wmgcat.itch.io/',
      website: 'https://wmgcat.net/',
      github: 'https://github.com/wmgcat',
    },
  },
];
