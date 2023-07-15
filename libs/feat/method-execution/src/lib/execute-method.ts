import { TRPCError } from '@trpc/server';
import { handlers } from '@worksheets/apps-handlers';
import {
  ApplicationKeys,
  ApplicationMethodKeys,
} from '@worksheets/apps-registry';
import { newMethodExecutionsDatabase } from '@worksheets/data-access/method-executions';

const db = newMethodExecutionsDatabase();

export const executeMethod = async <T extends ApplicationKeys>({
  userId,
  appId,
  methodId,
  input,
  context,
}: {
  userId: string;
  appId: T;
  methodId: ApplicationMethodKeys<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
}): Promise<unknown> => {
  const start = Date.now();
  console.log(`[${appId}.${methodId}] request received`);
  const app = handlers[appId];
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

  let data;
  try {
    data = await method({ input, context });
    console.log(`[${appId}.${methodId}] handler executed`);
    result.status = 200;
    result.finishedAt = Date.now();
    db.insert(result);
    return data;
    // TODO: unify method exceptions and errors
  } catch (error) {
    console.error(`[${appId}.${methodId}] handler failed`, error);
    // TODO: better error handling. This is just a POC
    result.status = 500;
    result.finishedAt = Date.now();
    db.insert(result);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `We are still improving our error handling.`,
    });
  }
};
