import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { logLevelEntity } from '@worksheets/data-access/tasks';
import { addWorksheetConnections } from '@worksheets/feat/worksheets-connections';

const sampleYaml = `
name: iterating loops
assign:
  - loop: [1, 2, 3, 4, apple]
  - data:

steps:
  - for: loop
    index: i
    value: v
    steps:
      - assign:
        - data: \${v}

return: \${data}
`.trim();
export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'PUT',
      path: '/worksheets',
      tags: ['worksheets'],
      summary: 'Create a new worksheet',
      description: 'Create a new worksheet',
      example: {
        request: {
          name: 'My worksheet',
          text: sampleYaml,
          timeout: 10, // in seconds
          description: "My worksheet's description",
          logLevelEntity: 'warn',
          connections: [],
        },
      },
    },
  })
  .input(
    z.object({
      name: z.string(),
      text: z.string(),
      timeout: z.number().optional().describe('Timeout in seconds'),
      description: z.string().default(''),
      logLevel: logLevelEntity
        .default('warn')
        .describe('The worksheets default log level when running a task'),
      connections: z
        .array(z.string())
        .optional()
        .describe(
          "Worksheet's connections. These should be the ids of connections you've already made."
        ),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { name, text, description, timeout, logLevel, connections },
      ctx: { user },
    }) => {
      const uid = user.uid;
      console.info(`creating a new worksheet for user ${uid}`);
      const worksheetId = await WorksheetsManagement.createWorksheet(uid, {
        timeout: timeout ?? 600,
        name,
        text,
        description,
        logLevel,
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
