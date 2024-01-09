import * as z from 'zod';
import {
  CompleteGame,
  RelatedGameModel,
  CompleteUser,
  RelatedUserModel,
} from './index';

export const GameVoteModel = z.object({
  id: z.string(),
  gameId: z.string(),
  createdAt: z.date(),
  up: z.number().int(),
  down: z.number().int(),
  userId: z.string(),
});

export interface CompleteGameVote extends z.infer<typeof GameVoteModel> {
  game: CompleteGame;
  user: CompleteUser;
}

/**
 * RelatedGameVoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameVoteModel: z.ZodSchema<CompleteGameVote> = z.lazy(() =>
  GameVoteModel.extend({
    game: RelatedGameModel,
    user: RelatedUserModel,
  })
);
