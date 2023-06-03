import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import * as ExecutionsHistory from '@worksheets/feat/execution-history';

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

    await ExecutionsHistory.clearWorksheetExecutions(user.uid, worksheetId);
    await WorksheetsManagement.deleteWorksheet(user.uid, worksheetId);

    return { ok: true };
  }
);
