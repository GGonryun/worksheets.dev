import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { updateWorksheetConnections } from '@worksheets/feat/worksheets-connections';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      summary: 'Update connections on a worksheet',
      description: 'Update connections for worksheet',
      tags: ['connections'],
      method: 'POST',
      path: '/worksheets/{worksheetId}/connections',
    },
  })
  .input(
    z.object({
      worksheetId: z.string(),
      connections: z.array(z.string()),
    })
  )
  .output(z.string().describe("the worksheet's id"))
  .mutation(async ({ input: { worksheetId, connections }, ctx: { user } }) => {
    const uid = user.uid;

    await updateWorksheetConnections({
      worksheetId,
      userId: uid,
      connectionIds: connections.filter((c) => c),
    });

    return worksheetId;
  });
