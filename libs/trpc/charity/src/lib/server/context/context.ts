import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@worksheets/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  return {
    req,
    atom: uuidv4().split('-')[0],
    db: prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
