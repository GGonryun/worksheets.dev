import { newPrivateDatabase } from '../data-access/private-db';
import { z } from 'zod';
import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import { v4 as uuidv4 } from 'uuid';
const input = z.object({
  text: z.string().optional(),
  path: z.array(z.string()).optional(),
});
const output = z.string();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({ user, data: { path, text } }) => {
    const id = path?.at(0) ?? uuidv4();
    const db = newPrivateDatabase(user);

    const records = await db.worksheets.list();
    const numRecords = Object.keys(records).length;

    if (numRecords >= MAXIMUM_WORKSHEETS) {
      throw new HandlerFailure({
        code: 'resource-exhausted',
        message: 'maximum worksheets threshold reached',
      });
    }

    console.info('saving worksheet', id, text);

    await db.worksheets.create({ id, text: text ?? '' });
    return id;
  }
);
