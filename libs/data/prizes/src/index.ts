import { Prize } from '@prisma/client';

export type SeedablePrize = Omit<Prize, 'createdAt' | 'updatedAt'>;

// TODO add first prizes
const rawPrizes: any[] = [];

export const prizes: SeedablePrize[] = rawPrizes;

export type PrizeId = (typeof rawPrizes)[number]['id'];
