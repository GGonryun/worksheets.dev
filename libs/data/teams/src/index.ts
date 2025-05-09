import {
  CreateTeamSchema,
  socialLinksDefaultValues,
} from '@worksheets/util/types';

export type SeedableTeam = CreateTeamSchema & { version: number };
const defaults = {
  termsOfService: true,
  privacyPolicy: true,
  submissionPolicies: true,
  links: {
    ...socialLinksDefaultValues,
  },
};
export const teams: SeedableTeam[] = [
  {
    version: 1,
    id: 'charity-games',
    name: 'Charity Games',
    logo: 'https://cdn.charity.games/_developers/charity-games.png',
    description:
      'Charity Games is developing games that raise money for charity. We believe everyone should have access to clean water!',
    ...defaults,
    links: {
      ...defaults.links,
      twitter: 'https://twitter.com/charitydotgames',
    },
  },
  {
    version: 1,
    id: 'wmgcat',
    name: 'wmgcat',
    logo: 'https://cdn.charity.games/_developers/wmgcat.png',
    description:
      'I am a game developer and artist, on this page you can see the projects that I develop for game jams or for myself. The main platform for my games is the web, it allows you to play my games on any device that supports javascript!',
    ...defaults,
    links: {
      ...defaults.links,
      itchio: 'https://wmgcat.itch.io/',
      website: 'https://wmgcat.net/',
      github: 'https://github.com/wmgcat',
    },
  },
  {
    version: 1,
    id: 'syb-coin-coin',
    name: 'Syb Coin Coin',
    logo: 'https://cdn.charity.games/_developers/syb-coin-coin.png',
    description:
      'Syb Coin Coin is a french indie game studio. We make games for fun and to learn new things. We also make games for game jams.',
    ...defaults,
    links: {
      ...defaults.links,
      twitter: 'https://twitter.com/coinsyb',
      website: 'https://coin-coin.net/',
      itchio: 'https://sybcoincoin.itch.io/',
      instagram: 'https://www.instagram.com/sybcoincoin/',
      twitch: 'https://www.twitch.tv/sybcoincoin',
      youtube: 'https://www.youtube.com/channel/UCpFiNmH6CcXj4VWfga7xxwA',
    },
  },
  {
    version: 1,
    id: 'gordo-raba',
    name: 'GordoRaba',
    logo: 'https://cdn.charity.games/_developers/gordo-raba.png',
    description:
      'Charity Games is developing games that raise money for charity. We believe everyone should have access to clean water!',
    ...defaults,
    links: {
      ...defaults.links,
      twitter: 'https://twitter.com/GordoRaba',
    },
  },
  {
    version: 1,
    id: 'llstd',
    name: 'LL studio, spol. s r.o.',
    logo: 'https://cdn.charity.games/_developers/llstd.png',
    description:
      'We are graphic studio from Slovakia. Our last game: RPG Conquer the World - pixel art top down adventure.',
    ...defaults,
    links: {
      ...defaults.links,
      twitter: 'https://twitter.com/llstdcom',
      pintrest: 'https://sk.pinterest.com/llstdcom/',
      tiktok: 'https://www.tiktok.com/@llstdcom',
      website: 'https://llstd.com',
    },
  },
  {
    version: 1,
    id: 'rainboworm',
    name: 'Rainboworm',
    logo: 'https://cdn.charity.games/_developers/rainboworm.png',
    description:
      "Hi! I'm an HTML game developer. I kind of just make whatever I want so my games are in a wide range of genres meaning everyone will probably find at least one of my games they enjoy!",
    ...defaults,
    links: {
      ...defaults.links,
      itchio: 'https://stheismakesthings.itch.io/',
    },
  },
  {
    version: 1,
    id: 'seredim',
    name: 'SereDim',
    logo: 'https://cdn.charity.games/_developers/seredim.jpeg',
    description:
      'Charity Games is developing games that raise money for charity. We believe everyone should have access to clean water!',
    ...defaults,
    links: {
      ...defaults.links,
      itchio: 'https://seredim.itch.io/',
    },
  },
  {
    version: 1,
    id: 'whitgroves',
    name: 'Whitgroves',
    logo: 'https://cdn.charity.games/_developers/whitgroves.jpeg',
    description:
      'Whit is a developer from Houston, TX. When not working on projects, he likes to sleep.',
    ...defaults,
    links: {
      ...defaults.links,
      website: 'https://blasteroids.io/',
      github: 'https://github.com/whitgroves/',
      linkedIn: 'https://www.linkedin.com/in/whitgroves/',
    },
  },
  {
    version: 1,
    id: 'ale-tobias',
    name: 'Ale Tobias',
    logo: 'https://cdn.charity.games/_developers/ale-tobias.png',
    description:
      "I'm a Indie game dev with martial arts skills and Parkour Teacher... Nothing of that it's in my games. Love a good narrative or good gameplay...",
    ...defaults,
    links: {
      ...defaults.links,
    },
  },
];
