import { newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
const input = z.object({ worksheetId: z.string().optional() });
export const worksheetSchema = z.object({ id: z.string(), text: z.string() });
export const worksheetsSchema = z.record(worksheetSchema);
const output = z.union([worksheetSchema, worksheetsSchema]);

export type Worksheet = z.infer<typeof worksheetSchema>;
export type GetWorksheetsRequest = z.infer<typeof input>;
export type GetWorksheetResponse = z.infer<typeof worksheetSchema>;
export type GetWorksheetsResponse = z.infer<typeof worksheetsSchema>;

export const get = newPrivateHandler({ input, output })(
  async ({ user: { uid }, data: { worksheetId } }) => {
    if (!worksheetId) {
      return await WorksheetsManagement.listUsersWorksheets(uid);
    }

    console.log('searching for worksheet', uid, worksheetId);
    const entity = await WorksheetsManagement.getUserWorksheet(
      uid,
      worksheetId
    );

    console.info('loading worksheet', worksheetId);
    return { text: entity.text, id: worksheetId };
  }
);
