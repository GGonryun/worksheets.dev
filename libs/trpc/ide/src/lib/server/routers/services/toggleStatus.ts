import {
  toggleServiceRequestSchema,
  toggleServiceResponseSchema,
} from '@worksheets/schemas-services';
import { privateProcedure } from '../../procedures';
import { toggleService } from '@worksheets/feat/service-registry';

export default privateProcedure
  .input(toggleServiceRequestSchema)
  .output(toggleServiceResponseSchema)
  .mutation(
    async ({
      ctx: {
        user: { uid: userId },
      },
      input: { serviceId },
    }) =>
      await toggleService(userId, {
        serviceId,
      })
  );
