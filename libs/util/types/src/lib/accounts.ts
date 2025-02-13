import { z } from 'zod';

export type Referral = {
  id: string;
  username: string | null;
  createdAt: number;
};

export const referrerSchema = z.object({
  id: z.string(),
  username: z.string(),
  code: z.string(),
  link: z.string(),
});

export type Referrer = z.infer<typeof referrerSchema>;
