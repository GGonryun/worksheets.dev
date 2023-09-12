import { categorizeServicesResponseSchema } from '@worksheets/schemas-services';
import { privateProcedure } from '../../procedures';
import { categorizeServices } from '@worksheets/feat/service-registry';
export default privateProcedure
  .output(categorizeServicesResponseSchema)
  .query(({ ctx }) => {
    return categorizeServices({ userId: ctx.user.uid });
  });
