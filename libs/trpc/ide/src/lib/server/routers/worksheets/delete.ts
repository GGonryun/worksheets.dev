import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  deleteWorksheetRequestSchema,
  deleteWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .input(deleteWorksheetRequestSchema)
  .output(deleteWorksheetResponseSchema)
  .mutation(async ({ input: { id }, ctx: { user } }) => {
    const uid = user.uid;
    await WorksheetsManagement.deleteWorksheet(uid, id);
    return id;
  });
