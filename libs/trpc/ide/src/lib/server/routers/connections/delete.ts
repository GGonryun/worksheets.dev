import { z } from 'zod';
import { deleteConnection } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(z.object({ connectionId: z.string() }))
  .output(z.boolean())
  .mutation(
    async ({
      input: { connectionId },
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(`loading connection form for ${connectionId}`);
      return await deleteConnection({ uid, id: connectionId });
    }
  );
