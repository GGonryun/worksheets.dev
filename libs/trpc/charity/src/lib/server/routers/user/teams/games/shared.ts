import { GameStatus, GameVisibility, Prisma } from '@worksheets/prisma';
import { z } from 'zod';

export const teamOwnedGameSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  title: z.string(),
  status: z.nativeEnum(GameStatus),
  visibility: z.nativeEnum(GameVisibility),
  plays: z.number(),
  duration: z.number(),
  lastUpdated: z.string(),
});

export type TeamOwnedGameSchema = z.infer<typeof teamOwnedGameSchema>;

export const parseTeamGame = (
  game: Prisma.GameGetPayload<{
    //no-op
  }>
): TeamOwnedGameSchema => ({
  id: game.id,
  // TODO: remove this when we have a mandatory teamId
  teamId: game.teamId ?? '',
  title: game.title,
  status: game.status,
  visibility: game.visibility,
  plays: game.plays,
  duration: game.duration,
  lastUpdated: game.updatedAt.toISOString(),
});
