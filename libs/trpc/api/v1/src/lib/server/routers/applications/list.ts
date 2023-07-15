import { listApplications } from '@worksheets/feat/applications-registry';
import {
  listApplicationsRequestSchema,
  listApplicationsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .meta({
    openapi: {
      enabled: false,
      method: 'GET',
      path: '/applications/',
      tags: ['applications'],
      summary: 'List applications',
      description: 'List application information',
    },
  })
  .input(listApplicationsRequestSchema)
  .output(listApplicationsResponseSchema)
  .query(async ({ input }) => {
    return listApplications();
  });
