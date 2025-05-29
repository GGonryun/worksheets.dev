import { ContestType, Prisma, PrizeType } from '@worksheets/prisma';
import { z } from 'zod';

export const contestSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(ContestType),
  startAt: z.number(),
  endAt: z.number(),
  prize: z.object({
    type: z.nativeEnum(PrizeType),
    name: z.string(),
    description: z.string(),
    headline: z.string(),
    imageUrl: z.string(),
  }),
  sponsor: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string(),
  }),
  game: z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    cover: z.string(),
  }),
});

export const convertContest = (
  contest: Prisma.ContestGetPayload<{
    include: {
      sponsor: true;
      prize: true;
      game: true;
    };
  }>
): ContestSchema => ({
  id: contest.id,
  type: contest.type,
  startAt: contest.startAt.getTime(),
  endAt: contest.endAt.getTime(),
  prize: {
    type: contest.prize.type,
    name: contest.prize.name,
    description: contest.prize.description,
    headline: contest.prize.headline,
    imageUrl: contest.prize.imageUrl,
  },
  sponsor: {
    name: contest.sponsor.name,
    logo: contest.sponsor.logo,
    url: contest.sponsor.url,
  },
  game: {
    id: contest.game.id,
    title: contest.game.title,
    thumbnail: contest.game.thumbnail,
    cover: contest.game.cover,
  },
});

export type ContestSchema = z.infer<typeof contestSchema>;
