import { protectedProcedure } from '../../trpc';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

export default protectedProcedure.query(async ({ ctx: { user } }) => {
  return await WorksheetsManagement.listUsersWorksheets(user.uid);
});
