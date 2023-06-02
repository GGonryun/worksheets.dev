import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { newPrivateDatabase } from '../data-access/private-db';

const input = z.object({ worksheetId: z.string() });
const output = z.object({ ok: z.boolean() });

export const del = newPrivateHandler({ input, output })(
  async ({ data: { worksheetId }, user }) => {
    if (!worksheetId) {
      throw new HandlerFailure({
        code: 'not-found',
        message: 'cannot delete worksheet that does not exist',
      });
    }
    const db = newPrivateDatabase(user);
    await db.executions.clear(worksheetId);
    await db.worksheets.delete(worksheetId);
    console.info(`worksheet ${worksheetId} was deleted`);
    return { ok: true };
  }
);
