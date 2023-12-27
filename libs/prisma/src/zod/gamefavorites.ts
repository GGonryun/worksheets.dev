import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const GameFavoritesModel = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
})

export interface CompleteGameFavorites extends z.infer<typeof GameFavoritesModel> {
  user: CompleteUser
}

/**
 * RelatedGameFavoritesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameFavoritesModel: z.ZodSchema<CompleteGameFavorites> = z.lazy(() => GameFavoritesModel.extend({
  user: RelatedUserModel,
}))
