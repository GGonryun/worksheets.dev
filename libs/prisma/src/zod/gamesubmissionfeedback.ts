import * as z from "zod"
import { CompleteGameSubmission, RelatedGameSubmissionModel } from "./index"

export const GameSubmissionFeedbackModel = z.object({
  id: z.string(),
  gameId: z.string(),
  text: z.string(),
  createdAt: z.date(),
})

export interface CompleteGameSubmissionFeedback extends z.infer<typeof GameSubmissionFeedbackModel> {
  game: CompleteGameSubmission
}

/**
 * RelatedGameSubmissionFeedbackModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameSubmissionFeedbackModel: z.ZodSchema<CompleteGameSubmissionFeedback> = z.lazy(() => GameSubmissionFeedbackModel.extend({
  game: RelatedGameSubmissionModel,
}))
