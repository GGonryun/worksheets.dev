import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import {
  loadConnectionForm,
  connectionFormSchema,
} from '@worksheets/feat/execution-settings';

export default protectedProcedure
  .input(z.string())
  .output(connectionFormSchema)
  .mutation(
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
