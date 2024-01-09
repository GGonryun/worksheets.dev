import * as z from 'zod';
import { CompleteGameSubmission, RelatedGameSubmissionModel } from './index';

export const StoredFileModel = z.object({
  id: z.string(),
  submissionId: z.string(),
  userId: z.string(),
  name: z.string(),
  path: z.string(),
  size: z.number().int(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteStoredFile extends z.infer<typeof StoredFileModel> {
  gameFileFor?: CompleteGameSubmission | null;
  thumbnailFor?: CompleteGameSubmission | null;
  coverFor?: CompleteGameSubmission | null;
}

/**
 * RelatedStoredFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoredFileModel: z.ZodSchema<CompleteStoredFile> = z.lazy(
  () =>
    StoredFileModel.extend({
      gameFileFor: RelatedGameSubmissionModel.nullish(),
      thumbnailFor: RelatedGameSubmissionModel.nullish(),
      coverFor: RelatedGameSubmissionModel.nullish(),
    })
);
