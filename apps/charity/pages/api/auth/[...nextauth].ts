import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@worksheets/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET)
  throw new Error('Failed to initialize Github authentication');

export default NextAuth({
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile: async (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    // ...add more providers here
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // support subdomains in production and local development
        domain: `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log('jwt callback', user);
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.sub ?? '',
        username: token?.user?.username,
      };
      return session;
    },
  },
});
