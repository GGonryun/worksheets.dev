import { z } from 'zod';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/user/identify',
      summary: 'Identify the user',
      description: 'Used to test your auth token.',
    },
  })
  .input(
    z.object({
      echo: z.string().optional(),
    })
  )
  .output(
    z.object({
      echo: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx: { user } }) => {
    console.info('user identified successfully', user);
    return input;
  });
