import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { newPrivateDatabase } from '../data-access/private-db';

const input = z.object({ path: z.array(z.string()) });
const output = z.object({ ok: z.boolean() });

export const del = newPrivateHandler({ input, output })(
  async ({ data: { path }, user }) => {
    const id = path?.at(0);
    if (!id) {
      throw new HandlerFailure({
        code: 'not-found',
        message: 'cannot delete worksheet that does not exist',
      });
    }
    const db = newPrivateDatabase(user);
    await db.executions.clear(id);
    await db.worksheets.delete(id);
    console.info(`worksheet ${id} was deleted`);
    return { ok: true };
  }
);
