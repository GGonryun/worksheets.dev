import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';

import { prisma } from '@worksheets/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import { randomBetween } from '@worksheets/util/numbers';

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  NEXT_PUBLIC_COOKIE_DOMAIN,
} = process.env;

if (!NEXT_PUBLIC_COOKIE_DOMAIN)
  throw new Error('NEXT_PUBLIC_COOKIE_DOMAIN is not defined');

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
  throw new Error('Failed to initialize Github authentication');

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
  throw new Error('Failed to initialize Google authentication');

if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET)
  throw new Error('Failed to initialize Discord authentication');

const AUTH_OPTIONS: AuthOptions = {
  session: { strategy: 'jwt', maxAge: 3000 },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        return {
          id: profile.sub.toString(),
          username: `${profile.email.split('@')[0]}-${randomBetween(0, 999)}`,
          email: profile.email,
          image: profile.picture,
          name: `${profile.given_name} ${profile.family_name}`,
          emailVerified: profile.email_verified,
        };
      },
    }),
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      profile: async (profile) => {
        const id = profile.id.toString();
        const username = profile.username;
        const avatar = profile.avatar;
        return {
          id,
          username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=512`,
          name: profile.global_name,
          emailVerified: profile.verified,
        };
      },
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      profile: async (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: profile.email !== null,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return Boolean(profile?.email_verified);
      }

      // Do different verification for other providers that don't have `email_verified`
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
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
};

export default AUTH_OPTIONS;
