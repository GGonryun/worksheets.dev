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
      logLevel: logLevelEntity.optional(),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { worksheetId, input, logLevel },
      ctx: {
        user: { uid },
      },
    }) => {
      console.info(`creating a task execution for ${worksheetId}`);
      return await createTask(uuidv4(), worksheetId, input, logLevel);
    }
  );
