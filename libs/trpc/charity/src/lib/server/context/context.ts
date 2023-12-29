import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { getToken } from 'next-auth/jwt';
import { ParsedUrlQuery } from 'querystring';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const session = await getToken({ req });

  return {
    req: req as IncomingMessage,
    db: prisma,
    session,
  };
}

export async function createServerSideContext(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const session = await getToken(ctx);

  return {
    req: ctx.req as IncomingMessage,
    db: prisma,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
