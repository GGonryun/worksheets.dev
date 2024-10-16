import { ActivationCodeType } from '@worksheets/prisma';
import { z } from 'zod';

import { itemSchema } from './items';

export const activationCodeDetailSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  type: z.nativeEnum(ActivationCodeType),
  accessedAt: z.number().nullable(),
  name: z.string(),
  sourceUrl: z.string(),
});

export type ActivationCodeDetailSchema = z.infer<
  typeof activationCodeDetailSchema
>;

export const activationCodeContentSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export type ActivationCodeContentSchema = z.infer<
  typeof activationCodeContentSchema
>;

export const redemptionCodeSchema = z.object({
  quantity: z.number(),
  item: itemSchema,
});

export type RedemptionCodeSchema = z.infer<typeof redemptionCodeSchema>;
