import { updateWorksheet } from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import { DEFAULT_API_SAMPLE_TEMPLATE } from '@worksheets/util-worksheets';
import {
  updateWorksheetRequestSchema,
  updateWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/worksheets/{id}',
      tags: ['worksheets'],
      summary: 'Update a worksheet',
      example: {
        request: {
          id: '1',
          text: DEFAULT_API_SAMPLE_TEMPLATE,
          enabled: true,
          timeout: 300,
        },
      },
    },
  })
  .input(updateWorksheetRequestSchema)
  .output(updateWorksheetResponseSchema)
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await updateWorksheet(uid, input);
    }
  );
