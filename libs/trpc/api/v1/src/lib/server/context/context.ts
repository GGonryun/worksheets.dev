import * as trpcNext from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import { user } from '@worksheets/feat/user-management';
import prisma from '@worksheets/prisma';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  // prevents accidentally caching the user in memory
  async function getUserFromHeader() {
    try {
      return await user.getUserFromApiToken(req.headers.authorization);
    } catch (error) {
      console.error(`failed to get user from header`, error);
    }
  }

  return {
    user: await getUserFromHeader(),
    req,
    db: prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
