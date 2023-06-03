import { newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import {
  clearWorksheetExecutions,
  deleteExecution,
} from '@worksheets/feat/execution-history';

const input = z.object({
  worksheetId: z.string(),
  executionId: z.string().optional(),
});
const output = z.boolean();

export const del = newPrivateHandler({ input, output })(
  async ({ data, user }) => {
    if (data.executionId) {
      await deleteExecution(user.uid, data.executionId);
    } else {
      await clearWorksheetExecutions(user.uid, data.worksheetId);
    }

    return true;
  }
);
