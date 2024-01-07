import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const DeveloperProfileModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
  websites: jsonSchema,
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export interface CompleteDeveloperProfile extends z.infer<typeof DeveloperProfileModel> {
  user: CompleteUser
}

/**
 * RelatedDeveloperProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeveloperProfileModel: z.ZodSchema<CompleteDeveloperProfile> = z.lazy(() => DeveloperProfileModel.extend({
  user: RelatedUserModel,
}))
