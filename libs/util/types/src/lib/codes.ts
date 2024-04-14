import { ItemType } from '@worksheets/prisma';
import { z } from 'zod';

export const activationCodeDetails = z.object({
  id: z.string(),
  content: z.string(),
  accessedAt: z.number().nullable(),
  item: z.object({
    name: z.string(),
    type: z.nativeEnum(ItemType),
    imageUrl: z.string(),
  }),
});

export type ActivationCodeDetails = z.infer<typeof activationCodeDetails>;
