import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Execution, ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { ExecutionEntity, ExecutionErrorEntity } from '../data-access/common';
import { v4 as uuidv4 } from 'uuid';
import { newPublicDatabase } from '../data-access/public-db';
import { getWorksheetPath } from '../common';

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
  const library = new OfficialApplicationLibrary();
  const execution = new Execution({ library });

  let text = data.text;
  let input = data.input;

  // if replaying, fallback to the replay's original text.
  if (data.replay) {
    const execution = await db.executions.get(data.replay);
    input = execution;
    text = execution.text;
  }

  // if empty, fallback to stored text.
  if (!text) {
    const worksheet = await db.worksheets.get(worksheetId);
    text = worksheet.text;
  }

  let output;
  let error: ExecutionErrorEntity | undefined;
  try {
    output = await execution.run(text, input);
  } catch (e) {
    // send unknown errors back to clients
    if (!(e instanceof ExecutionFailure)) {
      throw new HandlerFailure({
        code: 'unexpected',
        message: 'unexpected failure encountered during execution',
        cause: error,
        data: { ...data, worksheetId },
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
