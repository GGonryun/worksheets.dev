import { newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { newPrivateDatabase } from '../data-access/private-db';

const input = z.object({
  path: z.array(z.string()),
  executionId: z.string().optional(),
});
const output = z.boolean();

export const del = newPrivateHandler({ input, output })(
  async ({ data, user }) => {
    const db = newPrivateDatabase(user);
    const worksheetId = data.path[0]; // api route handler.

    if (data.executionId) {
      await db.executions.delete(data.executionId);
    } else {
      await db.executions.clear(worksheetId);
    }

    return true;
  }
);
