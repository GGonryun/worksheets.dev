import {
  callMethodRequestSchema,
  callMethodResponseSchema,
} from '@worksheets/schemas-applications';

import { executeMethod } from '@worksheets/feat-method-execution';
import { privateProcedure } from '../../procedures';
import { limits } from '@worksheets/feat/server-management';
import { middleware } from '../../trpc';
import { quotas } from '@worksheets/feat/user-management';

export const systemThrottle = middleware(async ({ next, ctx }) => {
  if (ctx.user) {
    await limits.throttle({
      id: ctx.user.uid,
      meta: 'rate-limit',
      quantity: 1, // system max no more than 100 requests per minute
    });
  } else {
    await limits.throttle({
      id: 'anonymous',
      meta: 'rate-limit',
      quantity: 10,
    });
  }

  return await next();
});

export const userQuotas = middleware(async ({ next, ctx }) => {
  if (ctx.user) {
    await quotas.request({
      uid: ctx.user.uid,
      type: 'executions',
      quantity: 1,
    });
  }

  return await next();
});

export default privateProcedure
  .use(systemThrottle)
  .use(userQuotas)
  .meta({
    logging: true,
    openapi: {
      protect: true,
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
  .input(callMethodRequestSchema)
  .output(callMethodResponseSchema)
  .mutation(async ({ input, ctx }) => {
    return executeMethod({
      userId: ctx.user?.uid ?? 'anonymous',
      appId: input.appId,
      methodId: input.methodId,
      input: input.input,
      context: input.context,
    });
  });
