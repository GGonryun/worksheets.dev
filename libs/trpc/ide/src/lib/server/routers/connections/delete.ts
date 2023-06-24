import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { deleteConnection } from '@worksheets/feat/execution-settings';

export default protectedProcedure.input(z.string()).mutation(
  async ({
    input,
    ctx: {
      user: { uid },
    },
  }) => {
    console.info(`loading connection form for ${input}`);
    return await deleteConnection({ uid, id: input });
  }
);
