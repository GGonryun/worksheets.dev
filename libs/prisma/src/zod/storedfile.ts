import * as z from "zod"

export const StoredFileModel = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  name: z.string(),
  path: z.string(),
  url: z.string(),
  size: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  gameId: z.string().nullish(),
})
