import { publicProcedure } from '../../../procedures';
import {
  listApplicationMethodsRequestSchema,
  listApplicationMethodsResponseSchema,
} from '@worksheets/schemas-applications';
import { listApplicationMethods } from '@worksheets/feat/applications-registry';

export default publicProcedure

  .meta({
    openapi: {
      method: 'GET',
      path: '/applications/{appId}/methods',
      tags: ['applications'],
      summary: 'List application methods',
      description: 'List application methods',
    },
  })
  .input(listApplicationMethodsRequestSchema)
  .output(listApplicationMethodsResponseSchema)
  .query(async ({ input: { appId } }) => {
    return listApplicationMethods(appId);
  });
