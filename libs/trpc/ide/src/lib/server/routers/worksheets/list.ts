import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .meta({
    /* 👉 */ openapi: {
      enabled: true,
      protect: true,
      method: 'GET',
      path: '/worksheets',
      tags: ['worksheets'],
      summary: 'Lists your worksheets',
      description: 'Lists your worksheets',
      example: {
        request: {
          body: {},
        },
      },
    },
  })
  .input(z.object({ limit: z.number().min(1).max(10).default(10) }).optional())
  .output(z.record(worksheetsEntitySchema))
  .query(async ({ ctx: { user } }) => {
    return await WorksheetsManagement.listUsersWorksheets(user.uid);
  });
