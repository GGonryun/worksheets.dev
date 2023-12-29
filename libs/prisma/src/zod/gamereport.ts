import * as z from 'zod';
import { ReportReason } from '@prisma/client';
import { CompleteUser, RelatedUserModel } from './index';

export const GameReportModel = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string().nullish(),
  reason: z.nativeEnum(ReportReason),
  text: z.string(),
  createdAt: z.date(),
});

export interface CompleteGameReport extends z.infer<typeof GameReportModel> {
  user?: CompleteUser | null;
}

/**
 * RelatedGameReportModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameReportModel: z.ZodSchema<CompleteGameReport> = z.lazy(
  () =>
    GameReportModel.extend({
      user: RelatedUserModel.nullish(),
    })
);
