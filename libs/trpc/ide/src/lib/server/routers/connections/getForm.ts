import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { loadConnectionForm } from '@worksheets/feat/execution-settings';

export default protectedProcedure.input(z.string()).mutation(
  async ({
    input,
    ctx: {
      user: { uid },
    },
  }) => {
    console.info(`loading connection form for ${input}`);
    return await loadConnectionForm({ uid, id: input });
  }
);
