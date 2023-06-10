import { ExecutionFailure } from '@worksheets/engine';
import { HandlerFailure, newPublicHandler } from '@worksheets/util/next';
import { getWorksheet } from '@worksheets/feat/worksheets-management';
import { newExecution } from '@worksheets/feat/execute-worksheet';
import { createExecution } from '@worksheets/feat/execution-history';
import { ExecutionErrorEntity } from '@worksheets/data-access/executions';

export const global = newPublicHandler({})(async ({ req }) => {
  const worksheetId = req.query['worksheetId'] as string;
  if (!worksheetId) {
    throw new HandlerFailure({
      code: 'not-found',
      message: "cannot run a worksheet that doesn't exist",
      data: { worksheetId },
    });
  }

  const worksheet = await getWorksheet(worksheetId);

  const execution = await newExecution(worksheet.uid);

  const rawInput = { ...req.body, ...req.query };
  // remove worksheet id key from input
  const { worksheetId: _, ...input } = rawInput;
  console.info(`executing worksheet`, _);

  let register;
  let error: ExecutionErrorEntity | undefined;
  try {
    register = await execution.run(worksheet.text, input);
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

  await createExecution({
    worksheetId,
    userId: worksheet.uid,
    timestamp: Date.now(),
    text: worksheet.text,
    dimensions: execution.dimensions(),
    result: {
      input: register?.input,
      error: error,
      output: register?.output,
    },
  });
  return register?.output;
});
