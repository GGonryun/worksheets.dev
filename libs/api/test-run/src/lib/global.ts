import { ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newMaybePrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import * as ExecutionHistory from '@worksheets/feat/execution-history';
import * as ExecuteWorksheet from '@worksheets/feat/execute-worksheet';
import { ExecutionErrorEntity } from '@worksheets/data-access/executions';
import * as WorksheetManagement from '@worksheets/feat/worksheets-management';

const input = z.object({
  text: z.string().optional(),
  worksheetId: z.string(),
  input: z.unknown().optional(),
  replay: z.string().optional(), //executionId to replay.
});
const output = z.object({
  data: z.unknown().optional(),
  message: z.string().optional(),
});

export type DryExecutionRequest = z.infer<typeof input>;
export type DryExecutionResponse = z.infer<typeof output>;

export const global = newMaybePrivateHandler({ input })(
  async ({ data, user }) => {
    let text = data.text ?? '';
    let input = data.input;

    // if replaying, use the original input.
    if (data.replay) {
      const history = await ExecutionHistory.getExecution(data.replay);
      input = history.result?.input;
    }

    if (!text && data.worksheetId) {
      const worksheet = await WorksheetManagement.getWorksheet(
        data.worksheetId
      );
      text = worksheet.text ?? '';
    }

    const uid = user?.uid ?? 'anonymous';

    const execution = await ExecuteWorksheet.newExecution(uid);

    let output;
    let error: ExecutionErrorEntity | undefined;
    try {
      output = await execution.run(text, input);
    } catch (e) {
      // send unknown errors back to clients
      if (!(e instanceof ExecutionFailure)) {
        console.error(`failed to perform execution`, e);
        throw new HandlerFailure({
          code: 'unexpected',
          message: 'unexpected failure encountered during test execution',
          cause: error,
          data: { text, uid },
        });
      }

      // convert error into result.
      error = {
        code: e.code,
        message: e.message,
      };
    }

    return await ExecutionHistory.createExecution({
      userId: uid,
      worksheetId: data.worksheetId,
      timestamp: Date.now(),
      text,
      dimensions: execution.dimensions(),
      result: {
        input: data.input,
        error,
        output,
      },
    });
  }
);