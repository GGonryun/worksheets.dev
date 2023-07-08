import { z } from 'zod';
import { logLevelEntity } from '@worksheets/data-access/tasks';
import { createTask } from '@worksheets/feat/task-processing';
import { v4 as uuidv4 } from 'uuid';
import { protectedProcedure } from '../../trpc';
import { findWorksheetByNameOrIdentifier } from '@worksheets/feat/worksheets-management';

export default protectedProcedure
  .meta({
    openapi: {
      protect: true,
      enabled: true,
      method: 'POST',
      path: '/worksheets/{identifier}/execute',
      summary: 'Execute a worksheet',
      tags: ['worksheets', 'executions'],
    },
  })
  .input(
    z.object({
      identifier: z
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
  .mutation(
    async ({ ctx: { user }, input: { identifier, input, overrides } }) => {
      console.info(
        'Executing worksheet',
        identifier,
        'with input',
        input,
        'and overrides',
        overrides
      );
      const worksheet = await findWorksheetByNameOrIdentifier(
        user.uid,
        identifier
      );
      console.info('found worksheet', worksheet);

      return await createTask(uuidv4(), worksheet.id, input, {
        verbosity: overrides?.logLevel,
        timeout: overrides?.timeout,
      });
    }
  );
