import { newPrivateDatabase } from '../data-access/private-db';
import { z } from 'zod';
import {
  HandlerFailure,
  newMaybePrivateHandler,
  newPrivateHandler,
} from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import { v4 as uuidv4 } from 'uuid';
import { DecodedIdToken } from 'firebase-admin/auth';
import { newPublicDatabase } from '../data-access/public-db';
const input = z.object({
  text: z.string().optional(),
  worksheetId: z.string().optional(),
});
const output = z.string();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newMaybePrivateHandler({ input, output })(
  async ({ user, data: { worksheetId, text } }) => {
    if (user) {
      return await privateHandler(user, worksheetId, text);
    } else {
      return await publicHandler();
    }
  }
);

const publicHandler = async () => {
  const db = newPublicDatabase();
  const worksheet = await db.worksheets.create();
  return worksheet.id;
};

const privateHandler = async (
  user: DecodedIdToken,
  worksheetId?: string,
  text?: string
) => {
  const db = newPrivateDatabase(user);

  const records = await db.worksheets.list();
  const numRecords = Object.keys(records).length;

  if (numRecords >= MAXIMUM_WORKSHEETS) {
    throw new HandlerFailure({
      code: 'resource-exhausted',
      message: 'maximum worksheets threshold reached',
    });
  }

  if (worksheetId && !(await db.worksheets.has(worksheetId))) {
    throw new HandlerFailure({
      code: 'not-found',
      message: 'worksheet does not exist',
    });
  }

  worksheetId = worksheetId ?? uuidv4();
  console.info('saving worksheet', worksheetId, text);
  const entity = await db.worksheets.upsert({
    id: worksheetId,
    text: text ?? '',
  });
  return entity.id;
};
