import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import {
  listWorksheetsRequestSchema,
  listWorksheetsResponseSchema,
} from '@worksheets/schemas-worksheets';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(listWorksheetsRequestSchema)
  .output(listWorksheetsResponseSchema)
  .query(async ({ ctx: { user } }) => {
    return await WorksheetsManagement.listUsersWorksheets(user.uid);
  });
