import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { getConnectionWorksheets } from '@worksheets/feat/worksheets-connections';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Get worksheets for connection',
      description: 'Get worksheets for connection',
      tags: ['worksheets'],
      method: 'GET',
      path: '/connections/{connectionId}/worksheets',
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
  .output(z.array(worksheetsEntitySchema))
  .query(
    async ({
      input: { connectionId },
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(
        `loading connection worksheets for connectionId ${connectionId}`
      );
      return await getConnectionWorksheets({
        userId: uid,
        connectionId,
      });
    }
  );
