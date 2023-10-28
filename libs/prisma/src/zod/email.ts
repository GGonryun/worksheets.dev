import * as z from 'zod';

export const EmailModel = z.object({
  id: z.string(),
  address: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
