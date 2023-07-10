import { getWorksheetConnections } from '@worksheets/feat/worksheets-management';
import { z } from '@worksheets/zod';
import { privateProcedure } from '../../../procedures';

export default privateProcedure

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
