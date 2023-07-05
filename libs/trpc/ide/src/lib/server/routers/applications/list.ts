import { applicationDetailsSchema } from '@worksheets/data-access/applications';
import { Severity, publicProcedure } from '../../trpc';
import { z } from 'zod';
import {
  listApplications,
  listApplicationsRequestSchema,
} from '@worksheets/feat/applications-registry';

export default publicProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      method: 'GET',
      path: '/applications/',
      tags: ['applications'],
      summary: 'List applications',
      description: 'List application information',
    },
  })
  .input(listApplicationsRequestSchema)
  .output(z.array(applicationDetailsSchema))
  .query(async ({ input: req }) => {
    return listApplications(req);
  });
