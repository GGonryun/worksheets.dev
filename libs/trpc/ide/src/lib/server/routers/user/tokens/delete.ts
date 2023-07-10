import { z } from 'zod';
import { tokens } from '@worksheets/feat/user-management';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(z.object({ tokenId: z.string().nonempty() }))
  .output(z.string())
  .mutation(
    async ({
      input: { tokenId },
      ctx: {
        user: { uid },
      },
    }) => {
      await tokens.delete({ id: tokenId, uid });
      return 'ok';
    }
  );
