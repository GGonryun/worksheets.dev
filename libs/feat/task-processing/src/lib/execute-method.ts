import { newPrivateLibrary } from '@worksheets/feat/execution-settings';
import { TRPCError } from '@trpc/server';
import { quotas } from '@worksheets/feat/user-management';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const apps = newApplicationsDatabase();

export const executeMethod = async (opts: {
  userId: string;
  appId: string;
  methodId: string;
  input: unknown;
  connectionId: string | undefined;
}): Promise<unknown> => {
  if (
    await quotas.isEmpty({
      uid: opts.userId,
      type: 'processingTime',
    })
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: SERVER_SETTINGS.USER_ERRORS.TOO_MUCH_PROCESSING_TIME,
    });
  }

  const library = newPrivateLibrary({
    userId: opts.userId,
    connectionIds: opts.connectionId ? [opts.connectionId] : [],
  });

  const start = Date.now();
  const result = await library.call(
    apps.stringifyBasic(opts.appId, opts.methodId),
    opts.input
  );
  const duration = Date.now() - start;

  await quotas.request({
    uid: opts.userId,
    type: 'processingTime',
    quantity: duration,
  });

  return result ?? {};
};
