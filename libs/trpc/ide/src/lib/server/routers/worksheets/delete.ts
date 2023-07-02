import { Severity, protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

export default protectedProcedure
  .meta({
    logging: Severity.INFO,
    openapi: {
      enabled: true,
      protect: true,
      method: 'DELETE',
      path: '/worksheets',
      tags: ['worksheets'],
      summary: 'Delete worksheet',
      description: 'Delete worksheet',
      example: {
        request: {
          body: {
            id: '123',
          },
        },
      },
    },
  })
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.boolean())
  .mutation(async ({ input: { id }, ctx: { user } }) => {
    const uid = user.uid;
    await WorksheetsManagement.deleteWorksheet(uid, id);
    return true;
  });
