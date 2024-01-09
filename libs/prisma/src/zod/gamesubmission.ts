import * as z from 'zod';
import {
  ProjectType,
  ViewportType,
  GameDevices,
  DeviceOrientations,
  GameCategory,
  GameSubmissionStatus,
} from '@prisma/client';
import {
  CompleteGameSubmissionFeedback,
  RelatedGameSubmissionFeedbackModel,
  CompleteProfile,
  RelatedProfileModel,
} from './index';

export const GameSubmissionModel = z.object({
  id: z.string(),
  slug: z.string().nullish(),
  title: z.string().nullish(),
  headline: z.string().nullish(),
  projectType: z.nativeEnum(ProjectType).nullish(),
  externalWebsiteUrl: z.string().nullish(),
  viewport: z.nativeEnum(ViewportType).nullish(),
  viewportWidth: z.number().int().nullish(),
  viewportHeight: z.number().int().nullish(),
  devices: z.nativeEnum(GameDevices).array(),
  orientations: z.nativeEnum(DeviceOrientations).array(),
  description: z.string().nullish(),
  instructions: z.string().nullish(),
  category: z.nativeEnum(GameCategory).nullish(),
  tags: z.string().array(),
  markets: z.string().nullish(),
  gameFileUrl: z.string().nullish(),
  thumbnailUrl: z.string().nullish(),
  coverUrl: z.string().nullish(),
  trailerUrl: z.string().nullish(),
  status: z.nativeEnum(GameSubmissionStatus),
  profileId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteGameSubmission
  extends z.infer<typeof GameSubmissionModel> {
  reviews: CompleteGameSubmissionFeedback[];
  profile: CompleteProfile;
}

/**
 * RelatedGameSubmissionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameSubmissionModel: z.ZodSchema<CompleteGameSubmission> =
  z.lazy(() =>
    GameSubmissionModel.extend({
      reviews: RelatedGameSubmissionFeedbackModel.array(),
      profile: RelatedProfileModel,
    })
  );
