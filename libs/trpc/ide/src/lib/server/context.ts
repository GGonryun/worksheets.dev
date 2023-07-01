import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { user } from '@worksheets/feat/user-management';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  // prevents accidentally caching the user in memory
  async function getUserFromHeader() {
    return await user.getFromAuthorization(req.headers.authorization);
  }

  return {
    user: await getUserFromHeader(),
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
