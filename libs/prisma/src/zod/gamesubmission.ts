import * as z from "zod"
import { ProjectType, ViewportType, GameDevices, DeviceOrientations, GameCategory } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const GameSubmissionModel = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  tagline: z.string(),
  projectType: z.nativeEnum(ProjectType),
  externalWebsiteUrl: z.string().nullish(),
  gameFileId: z.string(),
  viewport: z.nativeEnum(ViewportType),
  viewportWidth: z.number().int().nullish(),
  viewportHeight: z.number().int().nullish(),
  devices: z.nativeEnum(GameDevices).array(),
  orientations: z.nativeEnum(DeviceOrientations).array(),
  description: z.string().nullish(),
  instructions: z.string().nullish(),
  category: z.nativeEnum(GameCategory),
  tags: z.string().array(),
  purchaseOptions: jsonSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  gameId: z.string(),
  thumbnailId: z.string(),
  coverId: z.string(),
  screenshotIds: z.string().array(),
})

export interface CompleteGameSubmission extends z.infer<typeof GameSubmissionModel> {
  user: CompleteUser
}

/**
 * RelatedGameSubmissionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameSubmissionModel: z.ZodSchema<CompleteGameSubmission> = z.lazy(() => GameSubmissionModel.extend({
  user: RelatedUserModel,
}))
