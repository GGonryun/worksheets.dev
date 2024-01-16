import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../procedures';

export default protectedProcedure
  .output(
    z.object({
      id: z.string(),
      isPublisher: z.boolean(),
      username: z.string(),
      bio: z.string().nullable(),
    })
  )
  .query(async ({ ctx: { user } }) => {
    return user;
  });
