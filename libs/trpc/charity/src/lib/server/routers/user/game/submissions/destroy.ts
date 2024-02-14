import { TRPCError } from '@trpc/server';
import * as storage from '@worksheets/services/storage';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(z.object({ submissionId: z.string() }))
  .output(z.object({}))
  .mutation(async ({ input: { submissionId }, ctx: { user, db } }) => {
    const userId = user.id;
    console.info('destroying game submission', {
      userId,
      submissionId,
    });

    const submission = await db.gameSubmission.findFirst({
      where: {
        id: submissionId,
        userId,
      },
      select: {
        status: true,
        id: true,
      },
    });

    if (!submission) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Submission not found',
      });
    }

    // do not allow deleting submissions that have been submitted.
    // a separate manual process will be used to delete submissions that have been accepted.
    if (submission.status === 'ACCEPTED') {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You cannot delete an accepted submission.',
      });
    }

    // 1. get all the files that are associated with this submission.
    const files = await db.storedFile.findMany({
      where: {
        submissionId: submission.id,
      },
      select: {
        id: true,
        path: true,
      },
    });

    // 2. delete all the files from GCP
    try {
      await Promise.all(files.map((file) => storage.deleteFile(file.path)));
    } catch (error) {
      console.error('Error deleting files from GCP', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error deleting files from GCP',
        cause: error,
      });
    }

    try {
      // 3. delete the game submission
      await db.gameSubmission.delete({
        where: {
          id: submission.id,
        },
      });

      // 4. delete all the files from the DB
      await db.storedFile.deleteMany({
        where: {
          submissionId: submission.id,
        },
      });

      // 5. delete all the feedback from the DB
      await db.gameSubmissionFeedback.deleteMany({
        where: {
          submissionId: submission.id,
        },
      });
    } catch (error) {
      console.error('Error deleting submission or related resources', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error deleting submission or related resources',
        cause: error,
      });
    }

    return {
      okay: true,
    };
  });
