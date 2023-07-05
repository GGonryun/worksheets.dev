import { Severity, protectedProcedure } from '../../trpc';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

export default protectedProcedure
  .meta({
    logging: Severity.ERROR,
  })
  .query(
    async ({
      ctx: {
        user: { uid },
      },
    }) => {
      return await WorksheetsManagement.getWorksheetsDataTable(uid);
    }
  );
