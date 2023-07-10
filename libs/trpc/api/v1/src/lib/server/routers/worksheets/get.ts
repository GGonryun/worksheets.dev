import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  getWorksheetRequestSchema,
  getWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure

  .input(getWorksheetRequestSchema)
  .output(getWorksheetResponseSchema)
  .query(async ({ input: { id }, ctx: { user } }) => {
    return await WorksheetsManagement.getUserWorksheet(user.uid, id);
  });
