import { privateProcedure } from '../../procedures';
import {
  getConnectionDetailsRequestSchema,
  getConnectionDetailsResponseSchema,
} from '@worksheets/schemas-connections';
import { getConnectionDetails } from '@worksheets/feat/app-connections';

export default privateProcedure
  .input(getConnectionDetailsRequestSchema)
  .output(getConnectionDetailsResponseSchema)
  .query(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await getConnectionDetails(uid, input);
    }
  );
