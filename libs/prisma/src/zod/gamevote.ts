import * as z from "zod"

export const GameVoteModel = z.object({
  id: z.string(),
  gameId: z.string(),
  createdAt: z.date(),
  up: z.number().int(),
  down: z.number().int(),
})
