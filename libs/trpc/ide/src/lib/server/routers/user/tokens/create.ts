import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { tokens } from '@worksheets/feat/user-management';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: false,
      method: 'PUT',
      path: '/user/tokens',
      summary: 'Create a new API token',
    },
  })
  .input(
    z.object({
      name: z.string().nonempty(),
      expires: z.number().describe('expires in milliseconds from now'),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { name, expires },
      ctx: {
        user: { uid },
      },
    }) => {
      return await tokens.create({ name, uid, expires });
    }
  );
