import * as z from "zod"

export const GameVoteSubmissionModel = z.object({
  id: z.string(),
  gameId: z.string(),
  createdAt: z.date(),
  ip: z.string(),
  vote: z.number().int(),
})
