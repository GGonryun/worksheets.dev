import { z } from 'zod';
import { deleteConnectionField } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(
    z.object({
      settingId: z.string(),
      connectionId: z.string(),
    })
  )
  .mutation(async ({ input: { settingId, connectionId } }) => {
    return await deleteConnectionField({
      connectionId,
      settingId,
    });
  });
