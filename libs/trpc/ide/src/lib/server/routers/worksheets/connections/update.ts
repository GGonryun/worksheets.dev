import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { updateWorksheetConnections } from '@worksheets/feat/worksheets-connections';

export default protectedProcedure
  .input(
    z.object({
      worksheetId: z.string(),
      connections: z.array(z.string()),
    })
  )
  .output(z.string())
  .mutation(async ({ input: { worksheetId, connections }, ctx: { user } }) => {
    const uid = user.uid;

    await updateWorksheetConnections({
      worksheetId,
      userId: uid,
      connectionIds: connections.filter((c) => c),
    });

    return worksheetId;
  });
