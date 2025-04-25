import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import { createClient } from '@worksheets/services/kv';
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { getToken } from 'next-auth/jwt';
import { ParsedUrlQuery } from 'querystring';
import { v4 as uuid } from 'uuid';

export async function createContext(ctx: CreateNextContextOptions) {
  const { req, res } = ctx;

  const requestId = uuid();
  res.setHeader('x-request-id', requestId);

  const session = await getToken(ctx);

  return {
    type: 'api' as const,
    req: req,
    res: res,
    db: prisma,
    kv: createClient(),
    session,
  };
}

export async function createServerSideContext(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { req, res } = ctx;
  const session = await getToken(ctx);

  return {
    type: 'ssr' as const,
    req,
    res,
    db: prisma,
    kv: createClient(),
    session,
  };
}

export async function createStaticContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) {
  return {
    type: 'static' as const,
    req: null,
    res: null,
    db: prisma,
    kv: createClient(),
    session: null,
  };
}

export type Context = inferAsyncReturnType<
  | typeof createContext
  | typeof createServerSideContext
  | typeof createStaticContext
>;
