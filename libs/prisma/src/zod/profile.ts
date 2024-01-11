import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteGame, RelatedGameModel, CompleteGameSubmission, RelatedGameSubmissionModel } from "./index"

export const ProfileModel = z.object({
  id: z.string(),
  username: z.string(),
  bio: z.string().nullish(),
  isPublisher: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
})

export interface CompleteProfile extends z.infer<typeof ProfileModel> {
  user?: CompleteUser | null
  games: CompleteGame[]
  submissions: CompleteGameSubmission[]
}

/**
 * RelatedProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProfileModel: z.ZodSchema<CompleteProfile> = z.lazy(() => ProfileModel.extend({
  user: RelatedUserModel.nullish(),
  games: RelatedGameModel.array(),
  submissions: RelatedGameSubmissionModel.array(),
}))
