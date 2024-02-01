import { termsApprovalSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(
    termsApprovalSchema.extend({
      okay: z.boolean(),
    })
  )
  .query(async ({ ctx: { user } }) => {
    console.info("Getting user's publisher terms", user.id);
    return {
      okay: true,
      canApprove: true,
      hasApproved: user.isPublisher,
    };
  });
