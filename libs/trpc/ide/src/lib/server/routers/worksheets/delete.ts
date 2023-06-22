import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input: { id }, ctx: { user } }) => {
    const uid = user.uid;
    console.info(`deleting worksheet ${id} for user ${uid}`);
    await WorksheetsManagement.deleteWorksheet(uid, id);
  });
