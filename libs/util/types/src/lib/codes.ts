import { ActivationCodeType } from '@worksheets/prisma';
import { z } from 'zod';

export const activationCodeDetailSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  type: z.nativeEnum(ActivationCodeType),
  accessedAt: z.number().nullable(),
  expiresAt: z.number().nullable(),
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
