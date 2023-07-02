import { z } from 'zod';
import { logLevelEntity } from '@worksheets/data-access/tasks';
import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';
import { publicProcedure } from '../../trpc';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'POST',
      path: '/worksheets/{worksheetId}/execute',
      summary: 'Execute a worksheet',
      tags: ['worksheets', 'executions'],
    },
  })
  .input(
    z.object({
      worksheetId: z.string(),
      input: z.unknown(),
      overrides: z
        .object({
          timeout: z.number().optional(),
          logLevel: logLevelEntity.optional(),
        })
        .optional(),
    })
  )
  .output(z.string())
  .mutation(async ({ input: { worksheetId, input, overrides } }) => {
    console.info(`creating a task execution for ${worksheetId}`);
    return await createTask(uuidv4(), worksheetId, input, {
      verbosity: overrides?.logLevel,
      timeout: overrides?.timeout,
    });
  });
