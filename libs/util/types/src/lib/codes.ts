import { ItemType } from '@worksheets/prisma';
import { z } from 'zod';

export const activationCodeDetailSchema = z.object({
  id: z.string(),
  accessedAt: z.number().nullable(),
  name: z.string(),
  sourceUrl: z.string(),
  item: z.object({
    name: z.string(),
    type: z.nativeEnum(ItemType),
    imageUrl: z.string(),
  }),
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
