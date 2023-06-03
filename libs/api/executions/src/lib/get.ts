import { executionEntitySchema } from '@worksheets/data-access/executions';
import { listWorksheetExecutions } from '@worksheets/feat/execution-history';
import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';

const input = z.any();
const output = z.array(executionEntitySchema);

export type GetExecutionsResponse = z.infer<typeof output>;

export const get = newPublicHandler({ output, input })(
  async ({ data: { worksheetId } }) => {
    if (!worksheetId) {
      return [];
    }
    const data = await listWorksheetExecutions(worksheetId);
    return data;
  }
);
