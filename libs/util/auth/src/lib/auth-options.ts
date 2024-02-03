import { prisma } from '@worksheets/prisma';
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '@worksheets/services/environment';
import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { customPrismaAdapter } from './prisma-adapter';
import { googleRefreshAccessToken } from './refresh/google-oauth-refresh';

export const AUTH_OPTIONS: AuthOptions = {
  session: { strategy: 'jwt', maxAge: 3000 },
  adapter: customPrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile: async (profile) => {
        return {
          id: profile.sub.toString(),
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
        const avatar = profile.avatar;
        return {
          id,
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
    jwt: async ({ token, user, account }) => {
      // initial sign in
      if (account) {
        // jwt tokens return the expiration time in seconds initially
        // https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt#comment102247100_39926886
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : undefined;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }

      // initial sign in
      if (user) {
        token.user = user;
      }

      // refresh google access tokens
      if (token.provider === 'google') {
        console.log('inspecting google token', token);
        return googleRefreshAccessToken(token);
      }

      // Access token has expired, try to update it
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.sub ?? '',
      };
      return session;
    },
  },
};
