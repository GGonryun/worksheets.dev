import {
  selectServiceProviderRequestSchema,
  selectServiceProviderResponseSchema,
} from '@worksheets/schemas-services';
import { privateProcedure } from '../../procedures';
import { selectServiceProvider } from '@worksheets/feat/service-registry';

export default privateProcedure
  .input(selectServiceProviderRequestSchema)
  .output(selectServiceProviderResponseSchema)
  .mutation(
    async ({
      ctx: {
        user: { uid: userId },
      },
      input: { serviceId, providerId },
    }) =>
      await selectServiceProvider(userId, {
        serviceId,
        providerId,
      })
  );
