import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { logLevelEntity } from '@worksheets/data-access/tasks';
import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';

export default protectedProcedure
  .input(
    z.object({
      worksheetId: z.string(),
      input: z.unknown(),
      overrides: z.object({
        timeout: z.number().optional(),
        logLevel: logLevelEntity.optional(),
      }),
    })
  )
  .output(z.string())
  .mutation(async ({ input: { worksheetId, input, overrides } }) => {
    console.info(`creating a task execution for ${worksheetId}`);
    return await createTask(uuidv4(), worksheetId, input, {
      verbosity: overrides.logLevel,
      timeout: overrides.timeout,
    });
  });
