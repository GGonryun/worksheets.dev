import { listApplications } from '@worksheets/feat/applications-registry';
import {
  listApplicationsRequestSchema,
  listApplicationsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';

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
  .input(listApplicationsRequestSchema)
  .output(listApplicationsResponseSchema)
  .query(async ({ input: req }) => {
    return listApplications(req);
  });
