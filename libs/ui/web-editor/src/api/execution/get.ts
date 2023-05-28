import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { executionEntitySchema } from '../data-access/common';
import { newPublicDatabase } from '../data-access/public-db';

const input = z.object({ id: z.string() });
const output = z.array(executionEntitySchema);

export type GetExecutionsRequest = z.infer<typeof input>;
export type GetExecutionsResponse = z.infer<typeof output>;

export const get = newPublicHandler({ input, output })(
  async ({ data: { id } }) => {
    const db = newPublicDatabase();
    return await db.executions.get(id);
  }
);
