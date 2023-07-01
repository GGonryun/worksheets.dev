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
      protect: true,
    },
  })
  .input(z.object({ tokenId: z.string().nonempty() }))
  .output(z.string())
  .mutation(
    async ({
      input: { tokenId },
      ctx: {
        user: { uid },
      },
    }) => {
      await tokens.delete({ id: tokenId, uid });
      return 'ok';
    }
  );
