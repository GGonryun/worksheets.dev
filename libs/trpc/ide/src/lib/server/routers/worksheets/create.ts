import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { logLevelEntity } from '@worksheets/data-access/tasks';

export default protectedProcedure
  .input(
    z.object({
      name: z.string(),
      text: z.string(),
      description: z.string().default(''),
      logging: logLevelEntity.default('debug'),
      schedules: z.array(z.string()).optional(),
      events: z.array(z.string()).optional(),
      connections: z.array(z.string()).optional(),
    })
  )
  .mutation(
    async ({
      input: {
        name,
        text,
        description,
        logging,
        schedules,
        events,
        connections,
      },
      ctx: { user },
    }) => {
      const uid = user.uid;

      console.info(`creating a new worksheet for user ${uid}`);
      console.warn('TODO: save schedules', schedules);
      console.warn('TODO: save events', events);
      console.warn('TODO: save connections', connections);

      return await WorksheetsManagement.createWorksheet(uid, {
        name,
        text,
        description,
        logging,
      });
    }
  );
