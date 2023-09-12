import { listServicesResponseSchema } from '@worksheets/schemas-services';
import { publicProcedure } from '../../procedures';
import { listServices } from '@worksheets/feat/service-registry';
export default publicProcedure.output(listServicesResponseSchema).query(() => {
  return listServices();
});
