import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PostModel = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean(),
  authorId: z.string().nullish(),
})

export interface CompletePost extends z.infer<typeof PostModel> {
  author?: CompleteUser | null
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() => PostModel.extend({
  author: RelatedUserModel.nullish(),
}))
