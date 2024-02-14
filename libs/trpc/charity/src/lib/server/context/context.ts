import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { getToken } from 'next-auth/jwt';
import { ParsedUrlQuery } from 'querystring';

export async function createContext(ctx: CreateNextContextOptions) {
  const { req, res } = ctx;

  const session = await getToken(ctx);

  return {
    // Using unknown because all the different Next.js context types are not compatible we'll need to cast them to the correct type in a resolver that uses req/res.
    req: req as unknown | null,
    res: res as unknown | null,
    db: prisma,
    session,
  };
}

export async function createServerSideContext(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { req, res } = ctx;
  const session = await getToken(ctx);

  return {
    req,
    res,
    db: prisma,
    session,
  };
}

export async function createStaticContext(
  ctx: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) {
  return {
    req: null,
    res: null,
    db: prisma,
    session: null,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
