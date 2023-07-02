import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { executeMethod } from '@worksheets/feat/task-processing';

export default protectedProcedure
  .meta({
    openapi: {
      protect: true,
      method: 'POST',
      path: '/applications/{appId}/methods/{methodId}/execute',
      tags: ['applications', 'executions'],
      summary: "Execute an application's method",
      description: "Execute an application's method",
    },
  })
  .input(
    z.object({
      appId: z.string(),
      methodId: z.string(),
      input: z.any().describe('any json data'),
      connectionId: z
        .string()
        .optional()
        .describe(
          'use a connection for the execution if this method requires sensitive tokens or data'
        ),
    })
  )
  .output(z.any().describe('any json data'))
  .mutation(
    async ({
      input: { appId, methodId, input, connectionId },
      ctx: {
        user: { uid: userId },
      },
    }) => {
      return executeMethod({
        userId,
        appId,
        methodId,
        input,
        connectionId,
      });
    }
  );
