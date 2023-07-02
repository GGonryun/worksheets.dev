import {
  updateWorksheetRequestSchema,
  updateWorksheet,
  updateWorksheetResponseSchema,
} from '@worksheets/feat/worksheets-management';
import { Severity, protectedProcedure } from '../../trpc';
import { z } from 'zod';

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
    logging: Severity.INFO,
    openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/worksheets/{worksheetId}',
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
  })
  .input(
    updateWorksheetRequestSchema
      .omit({ id: true })
      .merge(z.object({ worksheetId: z.string() }))
  )
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
        id: input.worksheetId,
      });
    }
  );
