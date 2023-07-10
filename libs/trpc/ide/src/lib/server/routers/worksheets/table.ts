import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';

export default privateProcedure.query(
  async ({
    ctx: {
      user: { uid },
    },
  }) => {
    return await WorksheetsManagement.getWorksheetsDataTable(uid);
  }
);
