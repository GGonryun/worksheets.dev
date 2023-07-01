import {
  updateWorksheetRequestSchema,
  updateWorksheet,
  updateWorksheetResponseSchema,
} from '@worksheets/feat/worksheets-management';
import { Severity, protectedProcedure } from '../../trpc';

const sampleText = `
steps:
  - call: http
    input:
      url: https://api.sampleapis.com/beers/ale
      method: GET
    output: resp
  - return: \${resp.body}
`.trim();

export default protectedProcedure
  .meta({
    /* 👉 */ openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/worksheets/{id}',
      tags: ['worksheets'],
      summary: 'Update a worksheet',
      example: {
        id: '1',
        name: 'My Worksheet',
        description: 'This is my worksheet',
        isPublic: true,
        text: sampleText,
        logLevel: 'info',
        enabled: true,
        timeout: 30,
      },
    },
    logging: Severity.INFO,
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
      console.info(`updating worksheet ${uid} properties`, input);
      return await updateWorksheet(uid, {
        ...input,
      });
    }
  );
