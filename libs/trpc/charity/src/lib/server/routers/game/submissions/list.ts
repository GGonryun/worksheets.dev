import { protectedProcedure } from '../../../procedures';
import { basicGameSubmissionSchema } from '@worksheets/ui/pages/account';
import { createFileDownloadUrl } from '@worksheets/services/environment';

export default protectedProcedure
  .output(basicGameSubmissionSchema.array())
  .query(async ({ ctx: { db, user, profile } }) => {
    console.info(`finding submissions for profile`, { profileId: profile?.id });

    if (!profile) {
      console.warn('User has no profile', { userId: user.id });
      return [];
    }

    const result = await db.gameSubmission.findMany({
      where: {
        profileId: profile.id,
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
