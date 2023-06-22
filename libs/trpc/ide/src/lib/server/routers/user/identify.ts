import { z } from 'zod';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .input(
    z.object({
      uid: z.string().optional(),
    })
  )
  .mutation(async ({ input: { uid } }) => {
    console.log('received identify request for uid', uid);
    return { ok: true };
  });
