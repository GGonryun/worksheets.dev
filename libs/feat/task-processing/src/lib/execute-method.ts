import { newPrivateLibrary } from '@worksheets/feat/execution-settings';
import { TRPCError } from '@trpc/server';
import { quotas } from '@worksheets/feat/user-management';
import { limits } from '@worksheets/feat/server-management';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';

const apps = newApplicationsDatabase();

export const executeMethod = async (opts: {
  userId: string;
  appId: string;
  methodId: string;
  input: unknown;
  connectionId: string | undefined;
}): Promise<unknown> => {
  const start = Date.now();
  if (
    await quotas.isEmpty({
      uid: opts.userId,
      type: 'processingTime',
    })
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message:
        'You have exceeded your processing capacity. Contact customer support to increase your quota.',
    });
  }

  if (
    await limits.isEmpty({
      id: 'method-processing-time',
      meta: 'system',
    })
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message:
        'Server is currently unable to handle your request. Please try again later.',
    });
  }

  const library = newPrivateLibrary({
    userId: opts.userId,
    connectionIds: opts.connectionId ? [opts.connectionId] : [],
  });

  const result = await library.call(
    apps.stringifyBasic(opts.appId, opts.methodId),
    opts.input
  );

  const end = Date.now() - start;

  await Promise.all([
    limits.throttle({
      id: 'method-processing-time',
      meta: 'system',
      quantity: end / 1000,
    }),
    quotas.request({
      uid: opts.userId,
      type: 'processingTime',
      quantity: end / 1000,
    }),
  ]);

  return result ?? {};
};
