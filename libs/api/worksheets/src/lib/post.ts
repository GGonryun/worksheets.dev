import { z } from 'zod';
import { HandlerFailure, newMaybePrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';

const input = z.object({
  text: z.string().optional(),
  worksheetId: z.string().optional(),
});
const output = z.string();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newMaybePrivateHandler({ input, output })(
  async ({ user, data: { text, worksheetId } }) => {
    if (user) {
      return privateHandler(user.uid, worksheetId, text);
    } else {
      return publicHandler();
    }
  }
);

const publicHandler = async () => {
  const worksheet = await WorksheetsManagement.createWorksheet();
  return worksheet.id;
};

const privateHandler = async (
  uid: string,
  worksheetId?: string,
  text?: string
) => {
  const records = await WorksheetsManagement.listUsersWorksheets(uid);
  const numRecords = Object.keys(records).length;

  if (numRecords >= MAXIMUM_WORKSHEETS) {
    throw new HandlerFailure({
      code: 'resource-exhausted',
      message: 'maximum worksheets threshold reached',
    });
  }

  if (
    worksheetId &&
    !(await WorksheetsManagement.doesUserOwnWorksheet(uid, worksheetId))
  ) {
    throw new HandlerFailure({
      code: 'not-found',
      message: 'worksheet does not exist',
    });
  }

  console.info('upserting worksheet', worksheetId);
  const entity = await WorksheetsManagement.upsertWorksheet({
    id: worksheetId,
    text: text ?? '',
    uid: uid,
  });
  return entity.id;
};
