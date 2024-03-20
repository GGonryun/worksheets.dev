import { PrizeId } from '@worksheets/data/prizes';
import { RaffleId } from '@worksheets/data/raffles';

export type SeedableCode = {
  id: string;
  content: string;
  prizeId: PrizeId;
  raffleId?: RaffleId;
};

const rawCodes = [
  {
    id: '123',
    prizeId: 'bg3',
    content: 'encrypted-content',
    raffleId: 1,
  } as const,
];

export const codes: SeedableCode[] = rawCodes;

export type CodeId = (typeof rawCodes)[number]['id'];
