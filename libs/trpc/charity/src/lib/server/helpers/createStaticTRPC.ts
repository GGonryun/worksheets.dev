import { createServerSideHelpers } from '@trpc/react-query/server';
import { createStaticContext } from '@worksheets/trpc/shared';
import { GetStaticPropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { appRouter } from '../routers/_app';

export const createStaticTRPC = async (
  ctx: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createStaticContext(ctx),
  });
