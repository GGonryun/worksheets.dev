import { updateWorksheetConnections } from '@worksheets/feat/worksheets-management';
import { z } from 'zod';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
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
