import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import { createClient } from '@worksheets/services/kv';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { getServerSession, Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { ParsedUrlQuery } from 'querystring';

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null | undefined;
}

export async function createInnerContext(options?: CreateInnerContextOptions) {
  return {
    db: prisma,
    kv: createClient(),
    session: options?.session,
  };
}

export async function createContext() {
  const session = await getServerSession();
  const inner = await createInnerContext({ session });

  return {
    ...inner,
    type: 'api',
  };
}

export async function createServerSideContext(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { req, res } = ctx;
  const session = await getToken(ctx);

  return {
    type: 'ssr',
    req,
    res,
    db: prisma,
    kv: createClient(),
    session,
  };
}

export async function createStaticContext() {
  return {
    type: 'static',
    req: null,
    res: null,
    db: prisma,
    kv: createClient(),
    session: null,
  };
}

export type Context = Awaited<
  ReturnType<
    | typeof createContext
    | typeof createServerSideContext
    | typeof createStaticContext
  >
>;

export type InnerContext = Awaited<ReturnType<typeof createInnerContext>>;
