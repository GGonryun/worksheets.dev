import { newPrivateLibrary } from '@worksheets/feat/execution-settings';
import { TRPCError } from '@trpc/server';
import { quotas } from '@worksheets/feat/user-management';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const executeMethod = async (opts: {
  userId: string;
  path: string;
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
  });

  const start = Date.now();
  const result = await library.call({
    path: opts.path,
    input: opts.input,
    connection: opts.connectionId,
  });
  const duration = Date.now() - start;

  await quotas.request({
    uid: opts.userId,
    type: 'processingTime',
    quantity: duration,
  });

  return result ?? {};
};
