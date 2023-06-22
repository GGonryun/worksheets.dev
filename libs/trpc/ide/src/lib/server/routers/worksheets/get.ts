import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input: { id }, ctx: { user } }) => {
    return await WorksheetsManagement.getUserWorksheet(user.uid, id);
  });
