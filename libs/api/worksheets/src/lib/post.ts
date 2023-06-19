import { z } from 'zod';
import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';

const worksheetsdb = newWorksheetsDatabase();

const input = z.object({
  worksheetId: z.string(),
  text: z.string().optional(),
});

const output = z.boolean();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({
    user: { uid },
    data: {
      text,

      worksheetId,
    },
  }) => {
    const records = await WorksheetsManagement.listUsersWorksheets(uid);
    const numRecords = Object.keys(records).length;

    if (numRecords >= MAXIMUM_WORKSHEETS) {
      throw new HandlerFailure({
        code: 'resource-exhausted',
        message: 'maximum worksheets threshold reached',
      });
    }

    console.info('updating worksheet', worksheetId);
    const worksheet = await worksheetsdb.get(worksheetId);
    await worksheetsdb.update({
      ...worksheet,
      lastUpdated: Date.now(),
      text: text ?? '',
    });
    return true;
  }
);
