import { listServicesResponseSchema } from '@worksheets/schemas-services';
import { privateProcedure } from '../../procedures';
import { listServices } from '@worksheets/feat/service-registry';
export default privateProcedure
  .output(listServicesResponseSchema)
  .query(({ ctx }) => {
    return listServices({ userId: ctx.user.uid });
  });
