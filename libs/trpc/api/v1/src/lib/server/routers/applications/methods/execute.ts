import { executeMethod } from '@worksheets/feat/task-processing';
import { privateProcedure } from '../../../procedures';
import {
  callMethodRequestSchema,
  callMethodResponseSchema,
} from '@worksheets/schemas-applications';

export default privateProcedure
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
  .input(callMethodRequestSchema)
  .output(callMethodResponseSchema)
  .mutation(
    async ({
      input: { path, input, connection },
      ctx: {
        user: { uid: userId },
      },
    }) => {
      return executeMethod({
        path,
        userId,
        input,
        connectionId: connection,
      });
    }
  );
