import { ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import {
  ExecutionEntity,
  ExecutionErrorEntity,
  WorksheetEntity,
} from '../data-access/common';
import { v4 as uuidv4 } from 'uuid';
import { newPublicDatabase } from '../data-access/public-db';
import { getWorksheetPath } from '../util';

const input = z.object({
  text: z.string().optional(),
  input: z.unknown().optional(),
  replay: z.string().optional(), //executionId to replay.
});
const output = z.object({
  data: z.unknown().optional(),
  message: z.string().optional(),
});

export type PostExecutionRequest = z.infer<typeof input>;
export type PostExecutionResponse = z.infer<typeof output>;

export const post = newPublicHandler({ input })(async ({ data, req }) => {
  const db = newPublicDatabase();
  const [worksheetId] = getWorksheetPath(req);

  let text = data.text;
  let input = data.input;

  // if replaying, use the original input.
  if (data.replay) {
    const history = await db.executions.get(data.replay);
    input = history;
  }

  // if empty, fallback to stored text.
  let worksheet: WorksheetEntity | undefined;
  try {
    worksheet = await db.worksheets.get(worksheetId);
  } catch (error) {
    // worksheet doesn't exist.
    if (!(error instanceof HandlerFailure)) {
      throw error;
    }
  }
  const uid = worksheet?.uid ?? '';
  if (text == null) {
    text = worksheet?.text ?? '';
  }

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
        message: 'unexpected failure encountered during execution',
        cause: error,
        data: { worksheetId },
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
    worksheetId,
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
});
