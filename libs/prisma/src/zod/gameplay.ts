import * as z from 'zod';

export const GamePlayModel = z.object({
  id: z.string(),
  gameId: z.string(),
  total: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
