import * as z from "zod"
import { CompleteGame, RelatedGameModel, CompleteUser, RelatedUserModel } from "./index"

export const GameCommentModel = z.object({
  id: z.string(),
  parentId: z.string().nullish(),
  gameId: z.string(),
  userId: z.string(),
  text: z.string(),
  score: z.number().int(),
  hidden: z.boolean(),
  createdAt: z.date(),
})

export interface CompleteGameComment extends z.infer<typeof GameCommentModel> {
  game: CompleteGame
  user: CompleteUser
  parent?: CompleteGameComment | null
  replies: CompleteGameComment[]
}

/**
 * RelatedGameCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameCommentModel: z.ZodSchema<CompleteGameComment> = z.lazy(() => GameCommentModel.extend({
  game: RelatedGameModel,
  user: RelatedUserModel,
  parent: RelatedGameCommentModel.nullish(),
  replies: RelatedGameCommentModel.array(),
}))
