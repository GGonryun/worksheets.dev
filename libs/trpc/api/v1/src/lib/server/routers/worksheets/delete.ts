import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  deleteWorksheetRequestSchema,
  deleteWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .meta({
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
  .input(deleteWorksheetRequestSchema)
  .output(deleteWorksheetResponseSchema)
  .mutation(async ({ input: { id }, ctx: { user } }) => {
    const uid = user.uid;
    await WorksheetsManagement.deleteWorksheet(uid, id);
    return id;
  });
