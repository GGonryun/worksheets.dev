import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'GET',
      path: '/worksheets/{worksheetId}',
      tags: ['worksheets'],
      summary: 'Get a worksheet',
    },
  })
  .input(
    z.object({
      worksheetId: z.string(),
    })
  )
  .output(worksheetsEntitySchema)
  .query(async ({ input: { worksheetId }, ctx: { user } }) => {
    return await WorksheetsManagement.getUserWorksheet(user.uid, worksheetId);
  });
