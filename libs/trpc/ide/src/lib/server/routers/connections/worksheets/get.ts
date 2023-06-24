import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { getConnectionWorksheets } from '@worksheets/feat/worksheets-connections';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .input(z.string())
  .output(z.array(worksheetsEntitySchema))
  .query(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(`loading connection worksheets for connectionId ${input}`);
      return await getConnectionWorksheets({
        userId: uid,
        connectionId: input,
      });
    }
  );
