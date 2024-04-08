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

export const friendSchema = z.object({
  friendshipId: z.string(),
  username: z.string(),
  lastSeen: z.number(),
  isFavorite: z.boolean(),
  giftSentAt: z.number().nullable(),
});

export type Friend = z.infer<typeof friendSchema>;

export const followerSchema = z.object({
  friendshipId: z.string(),
  username: z.string(),
  friendCode: z.string(),
  isFriend: z.boolean(),
  isFavorite: z.boolean(),
});

export type Follower = z.infer<typeof followerSchema>;
