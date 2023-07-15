import * as trpcNext from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import { user } from '@worksheets/feat/user-management';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  // prevents accidentally caching the user in memory
  async function getUserFromHeader() {
    return await user.getUserFromApiToken(req.headers.authorization);
  }

  return {
    user: await getUserFromHeader(),
    req,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
