import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { getWorksheetConnections } from '@worksheets/feat/worksheets-connections';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Get current connections on a worksheet',
      description: 'Get connections for worksheet',
      tags: ['connections'],
      method: 'GET',
      path: '/worksheets/{worksheetId}/connections',
    },
  })
  .input(
    z.object({
      worksheetId: z.string(),
    })
  )
  .output(z.array(z.string()))
  .query(async ({ input: { worksheetId } }) => {
    return await getWorksheetConnections({
      worksheetId,
    });
  });
