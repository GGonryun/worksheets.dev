import { z } from 'zod';

export const basicWebsiteStatisticsSchema = z.object({
  donatedGames: z.number(),
  uniquePlayers: z.number(),
  totalGamePlays: z.number(),
  weeklyImpressions: z.number(),
  uniqueGames: z.number(),
});

export type BasicWebsiteStatistics = z.infer<
  typeof basicWebsiteStatisticsSchema
>;

export const gamePopularityStatisticsSchema = z.object({
  countries: z.array(z.object({ name: z.string(), percent: z.number() })),
  games: z.array(
    z.object({ id: z.string(), name: z.string(), plays: z.number() })
  ),
  players: z.object({ new: z.number(), returning: z.number() }),
  uniqueGames: z.number(),
});

export type GamePopularityStatistics = z.infer<
  typeof gamePopularityStatisticsSchema
>;
