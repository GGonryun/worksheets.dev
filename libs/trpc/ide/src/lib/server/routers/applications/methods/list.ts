import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { createExample } from '@worksheets/feat/applications-registry';

const db = newApplicationsDatabase();

export default publicProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/applications/{appId}/methods',
      tags: ['applications', 'methods'],
      summary: 'List application methods',
      description: 'List application methods',
    },
  })
  .input(z.object({ appId: z.string() }))
  .query(async ({ input: { appId } }) => {
    const app = db.getApp(appId);
    console.info('listing application methods', appId, app.methods.length);
    const methods = app.methods.map((method) => ({
      id: method.id,
      label: method.label,
      description: method.description,
      input: method.input ? zodToJsonSchema(method.input) : undefined,
      output: method.output ? zodToJsonSchema(method.output) : undefined,
      example: createExample(appId, method),
    }));
    return methods;
  });
