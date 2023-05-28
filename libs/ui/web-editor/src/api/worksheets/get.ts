import { newPrivateHandler } from '@worksheets/util/next';
import { newPrivateDatabase } from '../data-access/private-db';
import { z } from 'zod';

const input = z.object({ id: z.string().optional() });
const worksheetSchema = z.object({ text: z.string() });
const worksheetsSchema = z.record(worksheetSchema);
const output = z.union([worksheetSchema, worksheetsSchema]);

export type Worksheet = z.infer<typeof worksheetSchema>;
export type GetWorksheetsRequest = z.infer<typeof input>;
export type GetWorksheetResponse = z.infer<typeof worksheetSchema>;
export type GetWorksheetsResponse = z.infer<typeof worksheetsSchema>;

export const get = newPrivateHandler({ input, output })(
  async ({ user, data: { id } }) => {
    const db = newPrivateDatabase(user);

    if (!id) {
      return await db.worksheets.list();
    }

    const exists = await db.worksheets.has(id);
    if (!exists) {
      return { text: '' };
    }

    const entity = await db.worksheets.get(id);

    return { text: entity.text };
  }
);
