import * as z from 'zod';
import { CompleteUser, RelatedUserModel } from './index';

export const GameVoteModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  vote: z.number().int(),
  gameId: z.string(),
  userId: z.string(),
});

export interface CompleteGameVote extends z.infer<typeof GameVoteModel> {
  user: CompleteUser;
}

/**
 * RelatedGameVoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameVoteModel: z.ZodSchema<CompleteGameVote> = z.lazy(() =>
  GameVoteModel.extend({
    user: RelatedUserModel,
  })
);
