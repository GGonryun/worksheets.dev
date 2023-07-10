import { z } from 'zod';
import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';
import { executeWorksheetRequestSchema } from '@worksheets/schemas-worksheets';
import { publicProcedure } from '../../procedures';

export default publicProcedure

  .input(executeWorksheetRequestSchema)
  .output(z.string())
  .mutation(async ({ input: { worksheetId, input, overrides } }) => {
    console.info(`creating a task execution for ${worksheetId}`);
    return await createTask(uuidv4(), worksheetId, input, {
      verbosity: overrides?.verbosity,
      timeout: overrides?.timeout,
    });
  });
