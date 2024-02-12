import { z } from 'zod';

export const basicWebsiteStatisticsSchema = z.object({
  uniqueGames: z.number(),
  uniquePlayers: z.number(),
  totalGamePlays: z.number(),
  rafflesParticipated: z.number(),
  tokensAccumulated: z.number(),
  prizesDelivered: z.number(),
});

export type BasicWebsiteStatistics = z.infer<
  typeof basicWebsiteStatisticsSchema
>;
