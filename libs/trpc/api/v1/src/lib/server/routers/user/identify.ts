import { z } from 'zod';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/user/echo',
      summary: 'Echos a message back to the user',
      description: 'Used to test your auth token.',
      tags: ['user'],
    },
  })
  .input(
    z.object({
      echo: z.string(),
    })
  )
  .output(
    z.object({
      echo: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return input;
  });
