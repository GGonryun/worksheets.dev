import { PrizeId } from '@worksheets/data/prizes';
import { SponsorId } from '@worksheets/data/sponsors';
import { Raffle } from '@worksheets/prisma';

export type SeedableRaffle = Omit<
  Raffle,
  'createdAt' | 'updatedAt' | 'status'
> & {
  publishAt: Date;
  prizeId: PrizeId;
  sponsorId: SponsorId;
};

// TODO add first raffles
const rawRaffles: any[] = [];

export type RaffleId = (typeof rawRaffles)[number]['id'];

export const raffles: SeedableRaffle[] = rawRaffles;
