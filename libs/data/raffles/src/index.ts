import { Raffle } from '@prisma/client';
import { SponsorId } from '@worksheets/data/sponsors';

export type SeedableRaffle = Omit<
  Raffle,
  'createdAt' | 'updatedAt' | 'status'
> & {
  publishAt: Date;
  sponsorId: SponsorId;
};

const rawRaffles = [
  {
    id: 1,
    version: 1,
    expiresAt: new Date('4-18-2024'),
    publishAt: new Date('4-09-2024'),
    numWinners: 1,
    itemId: '2',
    sponsorId: 'charity-games',
  } as const,
  {
    id: 2,
    version: 1,
    expiresAt: new Date('4-17-2024'),
    publishAt: new Date('4-09-2024'),
    numWinners: 1,
    itemId: '3',
    sponsorId: 'charity-games',
  } as const,
  {
    id: 3,
    version: 1,
    expiresAt: new Date('4-16-2024'),
    publishAt: new Date('4-09-2024'),
    numWinners: 1,
    itemId: '5',
    sponsorId: 'charity-games',
  } as const,
];

export type RaffleId = (typeof rawRaffles)[number]['id'];

export const raffles: SeedableRaffle[] = rawRaffles;
