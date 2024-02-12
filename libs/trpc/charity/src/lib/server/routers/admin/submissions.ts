import { TRPCError } from '@trpc/server';
import {
  gameSubmissionDetails,
  gameSubmissionSummary,
} from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  list: adminProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      })
    )
    .output(gameSubmissionSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const submissions = await db.gameSubmission.findMany({
        take,
        skip,
        select: {
          id: true,
          userId: true,
          createdAt: true,
          title: true,
        },
      });

      return submissions.map((submission) => ({
        submissionId: submission.id,
        userId: submission.userId,
        title: submission.title,
        createdAt: submission.createdAt.getTime(),
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        submissionId: z.string(),
      })
    )
    .output(gameSubmissionDetails)
    .query(async ({ input: { submissionId }, ctx: { db } }) => {
      const submission = await db.gameSubmission.findFirst({
        where: {
          id: submissionId,
        },
      });

      if (!submission) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return {
        submissionId: submission.id,
        userId: submission.userId,
        slug: submission.slug,
        title: submission.title,
        headline: submission.headline,
        description: submission.description,
        instructions: submission.instructions,
        projectType: submission.projectType,
        categories: submission.categories,
        createdAt: submission.createdAt.getTime(),
        updatedAt: submission.updatedAt.getTime(),
      };
    }),
});
