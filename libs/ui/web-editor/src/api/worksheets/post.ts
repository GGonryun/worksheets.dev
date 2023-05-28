import { newPrivateDatabase } from '../data-access/private-db';
import { z } from 'zod';
import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';

const input = z.object({ text: z.string(), id: z.string() });
const output = z.unknown();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({ user, data: { id, text } }) => {
    const db = newPrivateDatabase(user);

    const records = await db.worksheets.list();
    const numRecords = Object.keys(records).length;

    if (numRecords >= MAXIMUM_WORKSHEETS) {
      throw new HandlerFailure({
        code: 'resource-exhausted',
        message: 'maximum worksheets threshold reached',
      });
    }

    const entity = await db.worksheets.create({ id, text });
    return entity;
  }
);
