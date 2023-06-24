import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { deleteConnectionField } from '@worksheets/feat/execution-settings';

export default protectedProcedure
  .input(
    z.object({
      settingId: z.string(),
      connectionId: z.string(),
    })
  )
  .mutation(async ({ input: { settingId, connectionId } }) => {
    // TODO: validate that the user has access to this connection.

    return await deleteConnectionField({
      connectionId,
      settingId,
    });
  });
