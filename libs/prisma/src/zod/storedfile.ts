import * as z from "zod"
import { CompleteGame, RelatedGameModel } from "./index"

export const StoredFileModel = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  name: z.string(),
  path: z.string(),
  url: z.string(),
  size: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  gameId: z.string().nullish(),
})

export interface CompleteStoredFile extends z.infer<typeof StoredFileModel> {
  game?: CompleteGame | null
}

/**
 * RelatedStoredFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoredFileModel: z.ZodSchema<CompleteStoredFile> = z.lazy(() => StoredFileModel.extend({
  game: RelatedGameModel.nullish(),
}))
