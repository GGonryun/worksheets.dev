import { createServerSideHelpers } from '@trpc/react-query/server';
import { createServerSideContext } from '../context/context';
import { appRouter } from '../routers/_app';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, PreviewData } from 'next';

export const createServerSideTRPC = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createServerSideContext(ctx),
  });
