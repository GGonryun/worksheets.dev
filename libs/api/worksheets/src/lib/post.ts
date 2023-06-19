import { z } from 'zod';
import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { logLevelEntity } from '@worksheets/data-access/tasks';

const worksheetsdb = newWorksheetsDatabase();

const input = z.object({
  worksheetId: z.string(),
  text: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  logging: logLevelEntity.optional(),
});

const output = z.boolean();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({
    user: { uid },
    data: { text, name, worksheetId, logging, description },
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

    if (text != null) {
      worksheet.text = text;
    }

    if (name != null) {
      worksheet.name = name;
    }

    if (description != null) {
      worksheet.description = description;
    }
    if (logging != null) {
      worksheet.logging = logging;
    }

    worksheet.updatedAt = Date.now();

    await worksheetsdb.update({
      ...worksheet,
    });

    return true;
  }
);
