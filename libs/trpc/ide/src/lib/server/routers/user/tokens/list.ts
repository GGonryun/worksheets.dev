import { z } from 'zod';
import { tokens } from '@worksheets/feat/user-management';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(z.object({}).optional())
  .output(
    z.array(
      z.object({
        id: z.string(),
        name: z.string().nonempty(),
        createdAt: z.string().describe('created at timestamp'),
        expiresOn: z.string().describe('expiration date timestamp'),
        expired: z.boolean().describe('is the token expired?'),
      })
    )
  )
  .query(
    async ({
      ctx: {
        user: { uid },
      },
    }) => {
      return await tokens.list({
        uid,
      });
    }
  );
