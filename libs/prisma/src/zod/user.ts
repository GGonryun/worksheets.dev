import * as z from "zod"
import { CompleteGameFavorites, RelatedGameFavoritesModel, CompleteGamePlay, RelatedGamePlayModel, CompleteGameVote, RelatedGameVoteModel, CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  username: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  favorites: CompleteGameFavorites[]
  plays: CompleteGamePlay[]
  votes: CompleteGameVote[]
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  favorites: RelatedGameFavoritesModel.array(),
  plays: RelatedGamePlayModel.array(),
  votes: RelatedGameVoteModel.array(),
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
}))
