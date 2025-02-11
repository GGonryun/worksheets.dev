import { createServerSideHelpers } from '@trpc/react-query/server';
import { createStaticContext } from '@worksheets/trpc/shared';

import { appRouter } from '../routers/_app';

export const createStaticTRPC = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createStaticContext(),
  });
