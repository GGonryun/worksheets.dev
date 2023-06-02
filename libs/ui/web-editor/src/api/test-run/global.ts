import { ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newMaybePrivateHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { ExecutionEntity, ExecutionErrorEntity } from '../data-access/common';
import { v4 as uuidv4 } from 'uuid';
import { newPublicDatabase } from '../data-access/public-db';

const input = z.object({
  text: z.string(),
  worksheetId: z.string(),
  input: z.unknown().optional(),
  replay: z.string().optional(), //executionId to replay.
});
const output = z.object({
  data: z.unknown().optional(),
  message: z.string().optional(),
});

export type ExecutionRequest = z.infer<typeof input>;
export type ExecutionResponse = z.infer<typeof output>;

export const global = newMaybePrivateHandler({ input })(
  async ({ data, user }) => {
    const db = newPublicDatabase();

    const text = data.text;
    let input = data.input;

    // if replaying, use the original input.
    if (data.replay) {
      const history = await db.executions.get(data.replay);
      input = history;
    }

    const uid = user?.uid ?? 'anonymous';

    const execution = await db.executions.newExecution(uid);

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

    const entity: ExecutionEntity = {
      id: uuidv4(),
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
    };

    return await db.executions.post(entity);
  }
);
