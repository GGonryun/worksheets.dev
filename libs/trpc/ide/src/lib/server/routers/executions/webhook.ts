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
      path: '/execute/{worksheetId}',
      summary:
        'Public endpoint for executing a worksheets. It is used by the webhook service. Useful if you are exposing your worksheets to the public.',
      tags: ['executions'],
    },
  })
  .input(
    z.object({
      worksheetId: z
        .string()
        .describe('The execution id or the name of the worksheet to execute'),
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
    return await createTask(uuidv4(), worksheetId, input, {
      verbosity: overrides?.logLevel,
      timeout: overrides?.timeout,
    });
  });
