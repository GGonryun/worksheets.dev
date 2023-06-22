import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { verify } from '@worksheets/util/auth/server';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    const auth = req.headers.authorization;
    if (auth) {
      const components = auth.split(' ');
      if (components.length > 1) {
        return await verifyToken(components[1]);
      }
    }
  }

  const user = await getUserFromHeader();

  return {
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

// verify retrns the users uid if they exist.
async function verifyToken(idToken: string) {
  try {
    const user = await verify(idToken);
    if (user) {
      return user;
    }
    console.error('TODO: id token verification failed');
  } catch (error) {
    console.error('TODO: unexpected error while verifying token', error);
  }
}
