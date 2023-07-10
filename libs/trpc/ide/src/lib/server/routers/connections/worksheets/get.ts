import { z } from 'zod';
import { privateProcedure } from '../../../procedures';
import { worksheetsEntitySchema } from '@worksheets/schemas-worksheets';
import { getConnectionWorksheets } from '@worksheets/feat/worksheets-management';

export default privateProcedure
  .input(z.object({ connectionId: z.string() }))
  .output(z.array(worksheetsEntitySchema))
  .query(
    async ({
      input: { connectionId },
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(
        `loading connection worksheets for connectionId ${connectionId}`
      );
      return await getConnectionWorksheets({
        userId: uid,
        connectionId,
      });
    }
  );
