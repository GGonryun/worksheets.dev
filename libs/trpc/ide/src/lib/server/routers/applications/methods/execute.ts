import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { executeMethod } from '@worksheets/feat/task-processing';
import { Clerk } from '@worksheets/apps/framework';

export default protectedProcedure
  .meta({
    openapi: {
      protect: true,
      method: 'POST',
      path: '/call/{path}',
      tags: ['applications', 'executions'],
      summary: "Execute an application's method",
      description: "Execute an application's method",
      example: {
        request: {
          path: 'math.max',
          input: [1, 2, 33, 4, 5],
        },
        response: 33,
      },
    },
  })
  .input(
    z.object({
      path: z.string(),
      input: z.any().describe('any json data'),
      connection: z
        .string()
        .optional()
        .describe(
          'use a connection for the execution if this method requires sensitive tokens or data'
        ),
      metadata: z
        .unknown()
        .describe("optional metadata to pass to the method's execution."),
    })
  )
  .output(z.any().describe('any json data'))
  .mutation(
    async ({
      input: { path, input, connection },
      ctx: {
        user: { uid: userId },
      },
    }) => {
      return executeMethod({
        ...Clerk.splitPath(path),
        userId,
        input,
        connectionId: connection,
      });
    }
  );
