import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const GamePlayModel = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string(),
  total: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteGamePlay extends z.infer<typeof GamePlayModel> {
  user: CompleteUser
}

/**
 * RelatedGamePlayModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGamePlayModel: z.ZodSchema<CompleteGamePlay> = z.lazy(() => GamePlayModel.extend({
  user: RelatedUserModel,
}))
