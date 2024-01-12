import { createServerSideHelpers } from '@trpc/react-query/server';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { createServerSideContext } from '../context/context';
import { appRouter } from '../routers/_app';

export const createServerSideTRPC = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createServerSideContext(ctx),
  });
