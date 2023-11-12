import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from 'next-auth/jwt';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const session = await getToken({ req });

  return {
    req,
    atom: uuidv4().split('-')[0],
    db: prisma,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
