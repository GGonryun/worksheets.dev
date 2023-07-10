import { getApplication } from '@worksheets/feat/applications-registry';
import { publicProcedure } from '../../procedures/public';
import {
  getApplicationRequestSchema,
  getApplicationResponseSchema,
} from '@worksheets/schemas-applications';

export default publicProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/applications/{appId}',
      tags: ['applications'],
      summary: 'Get application information',
      description: 'Get application information',
    },
  })
  .input(getApplicationRequestSchema)
  .output(getApplicationResponseSchema)
  .query(async ({ input: { appId } }) => {
    return getApplication(appId);
  });
