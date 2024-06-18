import common from '@worksheets/assets-common';

export type SeedableSponsor = {
  id: string;
  version: number;
  name: string;
  url: string;
  logo: string;
};

const rawSponsors = [
  {
    id: 'charity-games' as const,
    version: 2,
    name: 'Charity Games',
    url: 'https://charity.games/about',
    logo: common.charityGames.logos.square128,
  },
  {
    id: 'indie-fold' as const,
    version: 1,
    name: 'Indie Fold',
    url: 'https://indiefold.com/about',
    logo: 'https://cdn.charity.games/_partners/indiefold/square.png',
  },
  {
    id: 'loot4all' as const,
    version: 1,
    name: 'Loot4All',
    url: 'https://loot4all.org/',
    logo: 'https://cdn.charity.games/_partners/loot4all/logo.svg',
  },
];

export const sponsors: SeedableSponsor[] = rawSponsors;

export type SponsorId = (typeof rawSponsors)[number]['id'];
