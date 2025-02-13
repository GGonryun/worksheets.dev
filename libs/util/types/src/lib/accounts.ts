import { GameSubmissionStatus } from '@worksheets/prisma';
import { z } from 'zod';

export const basicGameSubmissionSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(GameSubmissionStatus),
  slug: z.string().nullable(),
  title: z.string().nullable(),
  tooltip: z.string().nullable(),
  thumbnail: z.string().nullable(),
});

export type BasicGameSubmission = z.infer<typeof basicGameSubmissionSchema>;

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
