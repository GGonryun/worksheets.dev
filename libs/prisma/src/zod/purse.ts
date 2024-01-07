import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PurseModel = z.object({
  id: z.string(),
  userId: z.string(),
  balance: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePurse extends z.infer<typeof PurseModel> {
  user: CompleteUser
}

/**
 * RelatedPurseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPurseModel: z.ZodSchema<CompletePurse> = z.lazy(() => PurseModel.extend({
  user: RelatedUserModel,
}))
