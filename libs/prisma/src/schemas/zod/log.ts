import * as z from 'zod';
import { Severity } from '@prisma/client';

export const LogModel = z.object({
  id: z.string(),
  content: z.string().nullish(),
  severity: z.nativeEnum(Severity),
  createdAt: z.date(),
  updatedAt: z.date(),
});
