import { createServerSideHelpers } from '@trpc/react-query/server';
import { createServerSideContext } from '@worksheets/trpc/shared';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { appRouter } from '../routers/_app';

export const createServerSideTRPC = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createServerSideContext(ctx),
  });
