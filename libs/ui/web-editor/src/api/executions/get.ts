import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { executionEntitySchema } from '../data-access/common';
import { newPublicDatabase } from '../data-access/public-db';

const input = z.any();
const output = z.array(executionEntitySchema);

export type GetExecutionsResponse = z.infer<typeof output>;

export const get = newPublicHandler({ output, input })(
  async ({ data: { worksheetId } }) => {
    if (!worksheetId) {
      return [];
    }
    const db = newPublicDatabase();
    const data = await db.executions.list(worksheetId);
    return data;
  }
);
