import { getApplication } from '@worksheets/feat/applications-registry';
import {
  getApplicationRequestSchema,
  getApplicationResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(getApplicationRequestSchema)
  .output(getApplicationResponseSchema)
  .query(async ({ input: { appId } }) => {
    return getApplication(appId);
  });
