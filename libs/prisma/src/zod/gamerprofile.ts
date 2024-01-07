import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const GamerProfileModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export interface CompleteGamerProfile extends z.infer<typeof GamerProfileModel> {
  user: CompleteUser
}

/**
 * RelatedGamerProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGamerProfileModel: z.ZodSchema<CompleteGamerProfile> = z.lazy(() => GamerProfileModel.extend({
  user: RelatedUserModel,
}))
