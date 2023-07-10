import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  createWorksheetRequestSchema,
  createWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .input(createWorksheetRequestSchema)
  .output(createWorksheetResponseSchema)
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await WorksheetsManagement.createWorksheet(uid, input);
    }
  );
