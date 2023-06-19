import { newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { worksheetsEntitySchema } from '@worksheets/data-access/worksheets';
const input = z.object({ worksheetId: z.string().optional() });
export const worksheetSchema = worksheetsEntitySchema;
export const worksheetsSchema = z.record(worksheetSchema);
const output = z.union([worksheetSchema, worksheetsSchema]);

export type Worksheet = z.infer<typeof worksheetSchema>;
export type GetWorksheetsRequest = z.infer<typeof input>;
export type GetWorksheetResponse = z.infer<typeof worksheetSchema>;
export type GetWorksheetsResponse = z.infer<typeof worksheetsSchema>;

export const get = newPrivateHandler({ input, output })(
  async ({ user: { uid }, data: { worksheetId } }) => {
    console.log('worksheetId', worksheetId);
    if (!worksheetId) {
      return await WorksheetsManagement.listUsersWorksheets(uid);
    }

    const entity = await WorksheetsManagement.getUserWorksheet(
      uid,
      worksheetId
    );

    console.info('loading worksheet', worksheetId);
    return { ...entity };
  }
);
