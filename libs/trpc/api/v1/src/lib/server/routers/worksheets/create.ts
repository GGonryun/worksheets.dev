import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { DEFAULT_SAMPLE_TEMPLATE } from '@worksheets/util-worksheets';
import { privateProcedure } from '../../procedures';
import {
  createWorksheetRequestSchema,
  createWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .meta({
    openapi: {
      enabled: false,
      protect: true,
      method: 'PUT',
      path: '/worksheets',
      tags: ['worksheets'],
      summary: 'Create a new worksheet',
      description: 'Create a new worksheet',
      example: {
        request: {
          name: 'My worksheet',
          text: DEFAULT_SAMPLE_TEMPLATE,
          timeout: 10, // in seconds
          description: "My worksheet's description",
          verbosity: 'warn',
          connections: [],
        },
      },
    },
  })
  .input(createWorksheetRequestSchema)
  .output(createWorksheetResponseSchema)
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await WorksheetsManagement.createWorksheet(uid, input);
    }
  );
