import { TRPCError } from '@trpc/server';
import { handlers } from '@worksheets/apps-handlers';
import {
  ApplicationKeys,
  ApplicationMethodKeys,
} from '@worksheets/apps-registry';

export const executeMethodv2 = async <T extends ApplicationKeys>({
  appId,
  methodId,
  input,
  context,
}: {
  appId: T;
  methodId: ApplicationMethodKeys<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
}): Promise<unknown> => {
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
  console.log(`[${appId}.${methodId}] handler found`);
  const data = await method({ input, context });
  console.log(`[${appId}.${methodId}] handler executed`);
  return data;
};
