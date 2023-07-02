import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { deleteConnection } from '@worksheets/feat/execution-settings';

export default protectedProcedure
  .meta({
    openapi: {
      protect: true,
      enabled: true,
      summary: 'Delete connection',
      tags: ['connections'],
      method: 'DELETE',
      path: '/connections/{connectionId}',
      parameters: [
        {
          in: 'path',
          name: 'connectionId',
          required: true,
        },
      ],
    },
  })
  .input(z.object({ connectionId: z.string() }))
  .output(z.boolean())
  .mutation(
    async ({
      input: { connectionId },
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(`loading connection form for ${connectionId}`);
      return await deleteConnection({ uid, id: connectionId });
    }
  );
