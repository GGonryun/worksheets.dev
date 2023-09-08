import { TRPCError } from '@trpc/server';
import { handlers } from '@worksheets/apps-handlers';
import { newMethodExecutionsDatabase } from '@worksheets/data-access/method-executions';
import { getFreshContext } from '@worksheets/feat/app-connections';
import { TRPC_ERROR_CODE_HTTP_STATUS } from '@worksheets/util/errors';

const db = newMethodExecutionsDatabase();

export const executeMethod = async ({
  userId,
  appId,
  methodId,
  connectionId,
  input,
  context,
}: {
  userId: string;
  appId: string;
  methodId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
  // If available, use this connection as the context.
  connectionId?: string;
}): Promise<unknown> => {
  const start = Date.now();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyHanders = handlers as any;
  const app = anyHanders[appId];
  if (!app) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `App ${appId} not found`,
    });
  }

  const method = app[methodId];
  if (!method) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `App ${appId} method ${methodId} not found`,
    });
  }

  const result = {
    uid: userId,
    appId,
    methodId,
    startedAt: start,
    finishedAt: 0,
    status: 0,
  };

  if (!context) {
    if (!connectionId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No context or connectionId provided',
      });
    }

    context = await getFreshContext({ userId, connectionId });
  }

  let data;
  // all our methods handlers use TRPCError to signal failure. we convert
  // them to http status codes when saving results. the TRPC OpenAPI
  // middleware will convert them to http status codes and return
  // the error as a text payload. and the SDK converts those http
  // status codes to a domain specific "Failure" object.

  try {
    data = await method({ input, context });
    result.status = 200;
    result.finishedAt = Date.now();
    db.insert(result);
    return data;
  } catch (error) {
    if (error instanceof TRPCError) {
      result.status = TRPC_ERROR_CODE_HTTP_STATUS[error.code];
    } else {
      result.status = 500;
    }
    result.finishedAt = Date.now();
    db.insert(result);

    throw error;
  }
};
