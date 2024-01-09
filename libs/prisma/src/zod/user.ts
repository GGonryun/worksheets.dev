import * as z from 'zod';
import {
  CompleteAccount,
  RelatedAccountModel,
  CompleteSession,
  RelatedSessionModel,
  CompleteGamePlay,
  RelatedGamePlayModel,
  CompleteGameVote,
  RelatedGameVoteModel,
  CompleteProfile,
  RelatedProfileModel,
  CompletePurse,
  RelatedPurseModel,
} from './index';

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[];
  sessions: CompleteSession[];
  plays: CompleteGamePlay[];
  votes: CompleteGameVote[];
  profile?: CompleteProfile | null;
  purse?: CompletePurse | null;
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    accounts: RelatedAccountModel.array(),
    sessions: RelatedSessionModel.array(),
    plays: RelatedGamePlayModel.array(),
    votes: RelatedGameVoteModel.array(),
    profile: RelatedProfileModel.nullish(),
    purse: RelatedPurseModel.nullish(),
  })
);
