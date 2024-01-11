import { z } from '@worksheets/zod';

export const castVoteSchema = z.object({
  gameId: z.string(),
  vote: z.union([z.literal('up'), z.literal('down')]),
});

export const voteSchema = z.union([
  z.literal('up'),
  z.literal('down'),
  z.literal('none'),
]);

export type CastVote = z.infer<typeof castVoteSchema>;
export type UserVote = z.infer<typeof voteSchema>;
