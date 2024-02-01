import { createServerSideHelpers } from '@trpc/react-query/server';
import { GetStaticPropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { createStaticContext } from '../context/context';
import { appRouter } from '../routers/_app';

export const createStaticTRPC = async (
  ctx: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createStaticContext(ctx),
  });
