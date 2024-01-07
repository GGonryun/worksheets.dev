import * as z from "zod"
import { CompleteGame, RelatedGameModel, CompleteUser, RelatedUserModel } from "./index"

export const GamePlayModel = z.object({
  id: z.string(),
  total: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  gameId: z.string(),
  userId: z.string().nullish(),
})

export interface CompleteGamePlay extends z.infer<typeof GamePlayModel> {
  game: CompleteGame
  user?: CompleteUser | null
}

/**
 * RelatedGamePlayModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGamePlayModel: z.ZodSchema<CompleteGamePlay> = z.lazy(() => GamePlayModel.extend({
  game: RelatedGameModel,
  user: RelatedUserModel.nullish(),
}))
