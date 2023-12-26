import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string | undefined;
    };
  }
  interface User {
    username?: string;
    gh_username?: string;
  }
  interface Profile {
    email_verified?: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user?: User | AdapterUser;
  }
}
