import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { tokens } from '@worksheets/feat/user-management';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/user/tokens',
      summary: 'Delete an api token',
      protected: true,
    },
  })
  .input(z.object({ id: z.string().nonempty() }))
  .mutation(
    async ({
      input: { id },
      ctx: {
        user: { uid },
      },
    }) => {
      return await tokens.delete({ id, uid });
    }
  );
