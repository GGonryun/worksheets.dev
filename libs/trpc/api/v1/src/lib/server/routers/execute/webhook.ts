import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';
import {
  executeWorksheetRequestSchema,
  executeWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .meta({
    openapi: {
      enabled: false,
      method: 'POST',
      path: '/execute/{worksheetId}',
      summary:
        'Public endpoint for executing a worksheets. It is used by the webhook service. Useful if you are exposing your worksheets to the public.',
      tags: ['executions'],
    },
  })
  .input(executeWorksheetRequestSchema)
  .output(executeWorksheetResponseSchema)
  .mutation(async ({ input: { worksheetId, input, overrides } }) => {
    return await createTask(uuidv4(), worksheetId, input, {
      verbosity: overrides?.verbosity,
      timeout: overrides?.timeout,
    });
  });
