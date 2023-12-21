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
  {
    id: 'syb-coin-coin',
    name: 'Syb Coin Coin',
    avatarUrl: 'https://cdn.charity.games/_developers/syb-coin-coin.png',
    description:
      'Syb Coin Coin is a french indie game studio. We make games for fun and to learn new things. We also make games for game jams.',
    socials: {
      twitter: 'https://twitter.com/coinsyb',
      website: 'https://webandsorcery.com/',
      website2: 'https://coin-coin.net/',
      itchio: 'https://sybcoincoin.itch.io/',
      instagram: 'https://www.instagram.com/sybcoincoin/',
      twitch: 'https://www.twitch.tv/sybcoincoin',
      youtube: 'https://www.youtube.com/channel/UCpFiNmH6CcXj4VWfga7xxwA',
    },
  },
  {
    id: 'gordo-raba',
    name: 'GordoRaba',
    avatarUrl: 'https://cdn.charity.games/_developers/gordo-raba.png',
    description: '',
    socials: {
      twitter: 'https://twitter.com/GordoRaba',
    },
  },
  {
    id: 'llstd',
    name: 'LL studio, spol. s r.o.',
    avatarUrl: 'https://cdn.charity.games/_developers/llstd.png',
    description:
      'We are graphic studio from Slovakia. Our last game: RPG Conquer the World - pixelart topdown adventure.',
    socials: {
      twitter: 'https://twitter.com/llstdcom',
      pintrest: 'https://sk.pinterest.com/llstdcom/',
      tiktok: 'https://www.tiktok.com/@llstdcom',
      website: 'https://llstd.com',
    },
  },
];
