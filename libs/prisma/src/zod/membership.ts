import * as z from "zod"
import { MembershipRole } from "@prisma/client"
import { CompleteTeam, RelatedTeamModel, CompleteUser, RelatedUserModel } from "./index"

export const MembershipModel = z.object({
  id: z.string(),
  role: z.nativeEnum(MembershipRole),
  teamId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMembership extends z.infer<typeof MembershipModel> {
  team: CompleteTeam
  user: CompleteUser
}

/**
 * RelatedMembershipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMembershipModel: z.ZodSchema<CompleteMembership> = z.lazy(() => MembershipModel.extend({
  team: RelatedTeamModel,
  user: RelatedUserModel,
}))
