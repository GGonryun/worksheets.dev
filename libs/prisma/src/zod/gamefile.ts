import * as z from "zod"
import { ProjectType } from "@prisma/client"
import { CompleteGame, RelatedGameModel } from "./index"

export const GameFileModel = z.object({
  id: z.string(),
  type: z.nativeEnum(ProjectType),
  url: z.string(),
})

export interface CompleteGameFile extends z.infer<typeof GameFileModel> {
  game?: CompleteGame | null
}

/**
 * RelatedGameFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameFileModel: z.ZodSchema<CompleteGameFile> = z.lazy(() => GameFileModel.extend({
  game: RelatedGameModel.nullish(),
}))
