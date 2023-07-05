import { z } from 'zod';
import { Severity, publicProcedure } from '../../trpc';
import {
  listTemplates,
  templateDetailsSchema,
} from '@worksheets/feat/templates-gallery';

export default publicProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      summary: 'List templates',
      tags: ['templates'],
      method: 'GET',
      path: '/templates',
      example: {
        request: {
          appIds: 'open-ai,',
        },
      },
    },
  })
  .input(
    z.object({
      appIds: z
        .string()
        .describe('comma separated list of app ids to filter by'),
    })
  )
  .output(z.array(templateDetailsSchema))
  .query(async ({ input: { appIds } }) => {
    return listTemplates({ appIds: appIds.split(',').filter(Boolean) });
  });
