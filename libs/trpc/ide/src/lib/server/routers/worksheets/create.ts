import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { logLevelEntity } from '@worksheets/data-access/tasks';
import { addWorksheetConnections } from '@worksheets/feat/worksheets-connections';

export default protectedProcedure
  .input(
    z.object({
      name: z.string(),
      text: z.string(),
      description: z.string().default(''),
      logging: logLevelEntity.default('debug'),
      connections: z.array(z.string()).optional(),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { name, text, description, logging, connections },
      ctx: { user },
    }) => {
      const uid = user.uid;
      console.info(`creating a new worksheet for user ${uid}`);
      const worksheetId = await WorksheetsManagement.createWorksheet(uid, {
        name,
        text,
        description,
        logging,
      });

      if (connections) {
        await addWorksheetConnections({
          worksheetId,
          userId: uid,
          connectionIds: connections,
        });
      }

      return worksheetId;
    }
  );
