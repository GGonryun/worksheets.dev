import {
  GameStatus,
  ProjectType,
  RaffleStatus,
  ReportReason,
  UserType,
} from '@prisma/client';
import { z } from 'zod';

import { GameTag } from './tag-schema';

/** Users */

export const userSummary = z.object({
  userId: z.string(),
  username: z.string(),
  createdAt: z.number(),
  type: z.nativeEnum(UserType),
});

export type UserSummary = z.infer<typeof userSummary>;

export const userDetails = z.object({
  userId: z.string(),
  email: z.string(),
  type: z.nativeEnum(UserType),
  referrerId: z.string().nullable(),
  username: z.string(),
  isPublisher: z.boolean(),
  referralCode: z.string(),
  notifications: z.number(),
  referrals: z
    .object({
      userId: z.string(),
    })
    .array(),
  submissions: z
    .object({
      submissionId: z.string(),
    })
    .array(),
  friends: z
    .object({
      userId: z.string(),
    })
    .array(),
  followers: z
    .object({
      userId: z.string(),
    })
    .array(),
  participation: z
    .object({
      raffleId: z.number(),
      numEntries: z.number(),
    })
    .array(),
  winnings: z
    .object({
      winnerId: z.string(),
    })
    .array(),

  rewards: z.object({
    totalTokens: z.number(),
    giftBoxes: z.number(),
    updatedAt: z.number(),
  }),
  createdAt: z.number(),
});

export type UserDetails = z.infer<typeof userDetails>;
/** Games */

export const gameSummary = z.object({
  gameId: z.string(),
  title: z.string(),
  status: z.nativeEnum(GameStatus),
  createdAt: z.number(),
});

export type GameSummary = z.infer<typeof gameSummary>;

export const gameDetails = z.object({
  gameId: z.string(),
  categories: z.custom<GameTag[]>(),
  status: z.nativeEnum(GameStatus),
  title: z.string(),
  description: z.string(),
  plays: z.number(),
  likes: z.number(),
  dislikes: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
  reports: z.object({ reportId: z.string(), reason: z.string() }).array(),
});

export type GameDetails = z.infer<typeof gameDetails>;

/** Game Report */

export const reportSummary = z.object({
  reportId: z.string(),
  gameId: z.string(),
  reason: z.nativeEnum(ReportReason),
  createdAt: z.number(),
});

export type ReportSummary = z.infer<typeof reportSummary>;

export const reportDetails = reportSummary.extend({
  text: z.string(),
});

export type ReportDetails = z.infer<typeof reportDetails>;

/** Game Submissions */

export const gameSubmissionSummary = z.object({
  submissionId: z.string(),
  userId: z.string(),
  title: z.string().nullable(),
  createdAt: z.number(),
});

export type GameSubmissionSummary = z.infer<typeof gameSubmissionSummary>;

export const gameSubmissionDetails = z.object({
  submissionId: z.string(),
  userId: z.string(),
  slug: z.string().nullable(),
  title: z.string().nullable(),
  headline: z.string().nullable(),
  description: z.string().nullable(),
  instructions: z.string().nullable(),
  projectType: z.nativeEnum(ProjectType).nullable(),
  categories: z.string().array(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type GameSubmissionDetails = z.infer<typeof gameSubmissionDetails>;

/** Prizes */

export const prizeSummary = z.object({
  prizeId: z.string(),
  name: z.string(),
  raffles: z.number(),
  createdAt: z.number(),
});

export type PrizeSummary = z.infer<typeof prizeSummary>;

export const prizeDetails = z.object({
  prizeId: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  raffles: z
    .object({
      raffleId: z.number(),
      participants: z.number(),
    })
    .array(),
  winners: z
    .object({
      winnerId: z.string(),
    })
    .array(),
  codes: z
    .object({
      codeId: z.string(),
    })
    .array(),
});

export type PrizeDetails = z.infer<typeof prizeDetails>;

/** Raffles */
export const raffleSummary = z.object({
  raffleId: z.number(),
  participants: z.number(),
  expiresAt: z.number(),
  createdAt: z.number(),
  status: z.nativeEnum(RaffleStatus),
});

export type RaffleSummary = z.infer<typeof raffleSummary>;

export const raffleDetails = z.object({
  raffleId: z.number(),
  prizeId: z.string(),
  status: z.nativeEnum(RaffleStatus),
  createdAt: z.number(),
  expiresAt: z.number(),
  numWinners: z.number(),
  participants: z
    .object({
      userId: z.string(),
      numEntries: z.number(),
    })
    .array(),
  winners: z
    .object({
      winnerId: z.string(),
    })
    .array(),
  codes: z
    .object({
      codeId: z.string(),
    })
    .array(),
});

export type RaffleDetails = z.infer<typeof raffleDetails>;

/** Raffle Winners */

export const winnerSummary = z.object({
  winnerId: z.string(),
  createdAt: z.number(),
  claimedAt: z.number().nullable(),
});

export type WinnerSummary = z.infer<typeof winnerSummary>;

export const winnerDetails = z.object({
  winnerId: z.string(),
  raffleId: z.number(),
  prizeId: z.string(),
  participationId: z.number(),
  codeId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.number(),
  claimedAt: z.number().nullable(),
  alert: z
    .object({
      alertId: z.string(),
      createdAt: z.number(),
      lastSentAt: z.number().nullable(),
      sentCount: z.number(),
    })
    .nullable(),
});

export type WinnerDetails = z.infer<typeof winnerDetails>;

/** Activation Codes */

export const activationCodeSummary = z.object({
  codeId: z.string(),
  createdAt: z.number(),
  winner: z.boolean(),
});

export type ActivationCodeSummary = z.infer<typeof activationCodeSummary>;

export const activationCodeDetails = z.object({
  codeId: z.string(),
  prizeId: z.string(),
  raffleId: z.number().nullable(),
  winnerId: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type ActivationCodeDetails = z.infer<typeof activationCodeDetails>;
