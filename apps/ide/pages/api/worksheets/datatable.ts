import {
  getWorksheetsDataTable,
  worksheetsDataTableSchema,
} from '@worksheets/feat/worksheets-management';
import { newPrivateHandler, skeleton } from '@worksheets/util/next';

const get = newPrivateHandler({ output: worksheetsDataTableSchema })(
  async ({ user }) => {
    return await getWorksheetsDataTable(user.uid);
  }
);

export default skeleton({ get });
