import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { user } from '@worksheets/feat/user-management';
import { v4 as uuidv4 } from 'uuid';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  // prevents accidentally caching the user in memory
  async function getUserFromHeader() {
    return await user.getFromAuthorization(req.headers.authorization);
  }

  return {
    req,
    atom: uuidv4().split('-')[0],
    user: await getUserFromHeader(),
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;