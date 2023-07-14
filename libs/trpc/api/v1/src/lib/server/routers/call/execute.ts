import { executeMethodv2 } from '@worksheets/feat/task-processing';
import {
  callMethodResponseSchema,
  callMethodV2RequestSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';
import {
  ApplicationKeys,
  ApplicationMethodKeys,
} from '@worksheets/apps-registry';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'POST',
      path: '/call/{appId}/{methodId}',
      tags: ['executions'],
      summary: "Execute an application's method",
      description: "Execute an application's method",
      example: {
        request: {
          appId: 'math',
          methodId: 'max',
          input: [1, 2, 33, 4, 5],
        },
        response: 33,
      },
    },
  })
  .input(callMethodV2RequestSchema)
  .output(callMethodResponseSchema)
  .mutation(async ({ input }) => {
    return executeMethodv2({
      appId: input.appId as ApplicationKeys,
      methodId: input.methodId as ApplicationMethodKeys<string>,
      input: input.input,
      context: input.context,
    });
  });
