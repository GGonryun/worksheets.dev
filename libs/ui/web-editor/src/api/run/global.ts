import { ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newPublicHandler } from '@worksheets/util/next';
import { ExecutionEntity, ExecutionErrorEntity } from '../data-access/common';
import { v4 as uuidv4 } from 'uuid';
import { newPublicDatabase } from '../data-access/public-db';

export const global = newPublicHandler({})(async ({ data, req }) => {
  const db = newPublicDatabase();

  const worksheetId = req.query.worksheetId as string;
  if (!worksheetId) {
    throw new HandlerFailure({
      code: 'not-found',
      message: "cannot run a worksheet that doesn't exist",
      data: { worksheetId },
    });
  }

  const worksheet = await db.worksheets.get(worksheetId);

  const execution = await db.executions.newExecution(worksheet.uid);

  let output;
  let error: ExecutionErrorEntity | undefined;
  try {
    output = await execution.run(worksheet.text, { ...req.body, ...req.query });
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
    userId: worksheet.uid,
    timestamp: Date.now(),
    text: worksheet.text,
    dimensions: execution.dimensions(),
    result: {
      input: data.input,
      error,
      output,
    },
  };

  return await db.executions.post(entity);
});
