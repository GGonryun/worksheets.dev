import { protectedProcedure } from '../../trpc';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .input(
    worksheetsEntitySchema
      .partial({ name: true, text: true, description: true, logging: true })
      .omit({ uid: true, createdAt: true, updatedAt: true })
  )
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await WorksheetsManagement.updateWorksheet({
        uid,
        ...input,
      });
    }
  );
