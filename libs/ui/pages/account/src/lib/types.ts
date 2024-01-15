import { GameSubmissionStatus } from '@prisma/client';
import { z } from '@worksheets/zod';

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
  username?: string;
  createdAt: number;
  gamesRemaining: number;
  tokensEarned: number;
};

export type Friend = {
  id: string;
  username?: string;
  lastSeen: number;
  gamesPlayed: number;
  isFavorite: boolean;
  hasSentGiftToday: boolean;
};
