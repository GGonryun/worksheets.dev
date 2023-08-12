import {
  getServiceDetailsRequestSchema,
  getServiceDetailsResponseSchema,
} from '@worksheets/schemas-services';
import { privateProcedure } from '../../procedures';
import { getServiceDetails } from '@worksheets/feat/service-registry';
export default privateProcedure
  .input(getServiceDetailsRequestSchema)
  .output(getServiceDetailsResponseSchema)
  .query(
    ({
      ctx: {
        user: { uid: userId },
      },
      input: { serviceId },
    }) => {
      return getServiceDetails({
        userId,
        serviceId,
      });
    }
  );
