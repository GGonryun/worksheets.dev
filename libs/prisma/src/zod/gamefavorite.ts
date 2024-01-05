import * as z from 'zod';
import { CompleteUser, RelatedUserModel } from './index';

export const GameFavoriteModel = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export interface CompleteGameFavorite
  extends z.infer<typeof GameFavoriteModel> {
  user: CompleteUser;
}

/**
 * RelatedGameFavoriteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameFavoriteModel: z.ZodSchema<CompleteGameFavorite> =
  z.lazy(() =>
    GameFavoriteModel.extend({
      user: RelatedUserModel,
    })
  );
