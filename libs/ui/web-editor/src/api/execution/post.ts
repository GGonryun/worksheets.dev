import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Execution, ExecutionFailure } from '@worksheets/engine';
import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { ExecutionEntity, ExecutionErrorEntity } from '../data-access/common';
import { v4 as uuidv4 } from 'uuid';
import { newPublicDatabase } from '../data-access/public-db';

const input = z.object({
  id: z.string(),
  text: z.string().optional(),
  input: z.unknown().optional(),
});
const output = z.object({
  data: z.unknown().optional(),
  message: z.string().optional(),
});

export type PostExecutionRequest = z.infer<typeof input>;
export type PostExecutionResponse = z.infer<typeof output>;

export const post = newPublicHandler({ input })(async ({ data }) => {
  const db = newPublicDatabase();
  const library = new OfficialApplicationLibrary();
  const execution = new Execution({ library });

  let text = data.text;
  if (!text) {
    const worksheet = await db.worksheets.get(data.id);
    text = worksheet.text;
  }

  let output;
  let error: ExecutionErrorEntity | undefined;
  try {
    output = await execution.run(text, data.input);
  } catch (e) {
    if (e instanceof ExecutionFailure) {
      error = {
        code: e.code,
        message: e.message,
      };
    } else {
      throw e;
    }
  }

  const entity: ExecutionEntity = {
    id: uuidv4(),
    worksheetId: data.id,
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
