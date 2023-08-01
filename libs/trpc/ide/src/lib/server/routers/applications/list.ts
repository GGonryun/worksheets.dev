import { listApplications } from '@worksheets/feat/applications-registry';
import {
  listApplicationsRequestSchema,
  listApplicationsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(listApplicationsRequestSchema)
  .output(listApplicationsResponseSchema)
  .query(async ({ input }) => {
    return listApplications(input);
  });
