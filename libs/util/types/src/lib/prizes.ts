import { ActivationCodeType } from '@prisma/client';
import { z } from 'zod';

export const prizeSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  imageUrl: z.string(),
  value: z.number(),
  discount: z.number(),
  type: z.nativeEnum(ActivationCodeType),
});

export type PrizeSchema = z.infer<typeof prizeSchema>;

export const prizeHistorySchema = prizeSchema.extend({
  purchasedAt: z.number(),
  user: z.object({ username: z.string(), id: z.string() }),
});

export type PrizeHistorySchema = z.infer<typeof prizeHistorySchema>;

export const purchaseResultSchema = z.object({
  prizeId: z.number(),
  name: z.string(),
  type: z.nativeEnum(ActivationCodeType),
  url: z.string(),
  code: z.string(),
  userId: z.string(),
  cost: z.number(),
});

export type PurchaseResultSchema = z.infer<typeof purchaseResultSchema>;

export const calculatePrizePrice = (
  prize: Pick<PrizeSchema, 'value' | 'discount'>
) => {
  return Math.floor(prize.value * (1 - prize.discount));
};
