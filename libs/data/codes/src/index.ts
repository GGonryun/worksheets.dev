import { PrizeId } from '@worksheets/data/prizes';
import { RaffleId } from '@worksheets/data/raffles';

export type SeedableCode = {
  id: string;
  content: string;
  prizeId: PrizeId;
  raffleId?: RaffleId;
};

// TODO add first codes
const rawCodes: any[] = [];

export const codes: SeedableCode[] = rawCodes;

export type CodeId = (typeof rawCodes)[number]['id'];
