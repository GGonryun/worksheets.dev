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
];

export const sponsors: SeedableSponsor[] = rawSponsors;

export type SponsorId = (typeof rawSponsors)[number]['id'];
