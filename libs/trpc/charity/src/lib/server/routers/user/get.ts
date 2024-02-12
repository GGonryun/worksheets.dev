import { UserType } from '@prisma/client';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';

export default protectedProcedure
  .output(
    z.object({
      id: z.string(),
      isPublisher: z.boolean(),
      username: z.string(),
      bio: z.string().nullable(),
      email: z.string(),
      type: z.nativeEnum(UserType),
    })
  )
  .query(async ({ ctx: { user } }) => {
    return user;
  });
