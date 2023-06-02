import { newPrivateHandler } from '@worksheets/util/next';
import { newPrivateDatabase } from '../data-access/private-db';
import { z } from 'zod';

const input = z.object({ worksheetId: z.string().optional() });
const worksheetSchema = z.object({ id: z.string(), text: z.string() });
const worksheetsSchema = z.record(worksheetSchema);
const output = z.union([worksheetSchema, worksheetsSchema]);

export type Worksheet = z.infer<typeof worksheetSchema>;
export type GetWorksheetsRequest = z.infer<typeof input>;
export type GetWorksheetResponse = z.infer<typeof worksheetSchema>;
export type GetWorksheetsResponse = z.infer<typeof worksheetsSchema>;

export const get = newPrivateHandler({ input, output })(
  async ({ user, data: { worksheetId } }) => {
    const db = newPrivateDatabase(user);

    if (!worksheetId) {
      return await db.worksheets.list();
    }

    const exists = await db.worksheets.has(worksheetId);
    if (!exists) {
      return { text: '', id: worksheetId };
    }

    const entity = await db.worksheets.get(worksheetId);
    console.info('loading worksheet', worksheetId, entity);
    return { text: entity.text, id: worksheetId };
  }
);
