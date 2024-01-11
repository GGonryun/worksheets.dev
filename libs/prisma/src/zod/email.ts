import * as z from "zod"

export const EmailModel = z.object({
  id: z.string(),
  address: z.string(),
  verified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
