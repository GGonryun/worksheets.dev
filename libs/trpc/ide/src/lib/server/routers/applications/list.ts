import {
  applicationDetailsSchema,
  convertApplicationDefinition,
  newApplicationsDatabase,
} from '@worksheets/data-access/applications';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';

const db = newApplicationsDatabase();

export default publicProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/applications/',
      tags: ['applications'],
      summary: 'List applications',
      description: 'List application information',
    },
  })
  .input(
    z.object({
      customizable: z.boolean().default(false),
    })
  )
  .output(z.array(applicationDetailsSchema))
  .query(async ({ input: { customizable } }) => {
    let all = db.list();

    if (customizable) {
      all = all.filter((app) => Boolean(app.settings));
    }

    return all.map(convertApplicationDefinition);
  });
