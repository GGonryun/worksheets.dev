import { createFileDownloadUrl } from '@worksheets/services/environment';
import { basicGameSubmissionSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(basicGameSubmissionSchema.array())
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info(`finding submissions for user`, { userId });

    const result = await db.gameSubmission.findMany({
      where: {
        userId,
      },
      include: {
        thumbnailFile: true,
        reviews: true,
      },
    });

    console.info(`found ${result.length} submissions`);

    return result.map((submission) => ({
      id: submission.id,
      status: submission.status,
      slug: submission.slug,
      title: submission.title,
      tooltip:
        submission.status === 'REJECTED'
          ? `Your submission failed review. ${submission.reviews.join(', ')}`
          : null,
      thumbnail: submission.thumbnailFile
        ? createFileDownloadUrl(submission.thumbnailFile.path)
        : null,
    }));
  });
