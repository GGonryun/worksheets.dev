import { z } from 'zod';
import { tokens } from '@worksheets/feat/user-management';
import { addDaysToCurrentTime } from '@worksheets/util/time';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .input(
    z.object({
      name: z.string().nonempty(),
      expiresInDays: z.number().describe('expires in days from now'),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { name, expiresInDays },
      ctx: {
        user: { uid },
      },
    }) => {
      return await tokens.create({
        name,
        uid,
        expires: addDaysToCurrentTime(expiresInDays).getTime(),
      });
    }
  );
