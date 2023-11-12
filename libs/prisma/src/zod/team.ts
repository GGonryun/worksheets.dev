import * as z from "zod"
import { CompleteMembership, RelatedMembershipModel, CompleteGame, RelatedGameModel } from "./index"

export const TeamModel = z.object({
  id: z.string(),
  subdomain: z.string(),
  name: z.string().nullish(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string().nullish(),
  logo: z.string().nullish(),
})

export interface CompleteTeam extends z.infer<typeof TeamModel> {
  memberships: CompleteMembership[]
  games: CompleteGame[]
}

/**
 * RelatedTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => TeamModel.extend({
  memberships: RelatedMembershipModel.array(),
  games: RelatedGameModel.array(),
}))
