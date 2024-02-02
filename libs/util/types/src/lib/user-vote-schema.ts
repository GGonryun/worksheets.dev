import { z } from 'zod';

export const voteSchema = z.union([z.literal('up'), z.literal('down')]);

export const castVoteSchema = z.object({
  gameId: z.string(),
  vote: voteSchema,
});

export type CastVote = z.infer<typeof castVoteSchema>;
export type Vote = z.infer<typeof voteSchema>;
