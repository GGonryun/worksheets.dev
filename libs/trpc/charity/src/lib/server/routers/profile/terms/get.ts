import { termsApprovalSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(termsApprovalSchema)
  .query(async ({ ctx: { user, db } }) => {
    const profile = await db.profile.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        isPublisher: true,
      },
    });

    return {
      hasApproved: profile?.isPublisher ?? false,
      canApprove: profile != null,
    };
  });
