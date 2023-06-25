import { protectedProcedure } from '../../trpc';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';

export default protectedProcedure
  .input(
    worksheetsEntitySchema
      .partial({
        name: true,
        text: true,
        description: true,
        logLevel: true,
        enabled: true,
        timeout: true,
      })
      .omit({ uid: true, createdAt: true, updatedAt: true })
  )
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(`updating worksheet ${uid} properties`, input);
      return await WorksheetsManagement.updateWorksheet({
        uid,
        ...input,
      });
    }
  );
