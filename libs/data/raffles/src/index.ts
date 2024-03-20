import { Raffle } from '@prisma/client';
import { PrizeId } from '@worksheets/data/prizes';
import { SponsorId } from '@worksheets/data/sponsors';

export type SeedableRaffle = Omit<
  Raffle,
  'createdAt' | 'updatedAt' | 'status'
> & {
  publishAt: Date;
  prizeId: PrizeId;
  sponsorId: SponsorId;
};

const rawRaffles = [
  {
    id: 1,
    version: 1,
    expiresAt: new Date('3-30-2024'),
    publishAt: new Date('3-21-2024'),
    numWinners: 1,
    prizeId: 'bg3',
    sponsorId: 'charity-games',
  } as const,
];

export type RaffleId = (typeof rawRaffles)[number]['id'];

export const raffles: SeedableRaffle[] = rawRaffles;
