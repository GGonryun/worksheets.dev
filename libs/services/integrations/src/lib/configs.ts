import { IntegrationProvider, IntegrationType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { DiscordAPI } from '@worksheets/api/discord';
import { SteamAPI } from '@worksheets/api/steam';
import { TwitchAPI } from '@worksheets/api/twitch';
import { OAuthIntegrationProvider } from '@worksheets/util/integrations';
import { isExpired, secondsFromNow } from '@worksheets/util/time';

import { APIKeyConfig, ProviderConfig } from '..';

export const OAUTH_CONFIG: Record<OAuthIntegrationProvider, ProviderConfig> = {
  [IntegrationProvider.TWITCH]: {
    provider: IntegrationProvider.TWITCH,
    type: IntegrationType.OAUTH,
    name: 'Twitch',
    clientId: process.env['TWITCH_CLIENT_ID'] || '',
    clientSecret: process.env['TWITCH_CLIENT_SECRET'] || '',
    scopes: ['user:read:follows'],
    authorize: { url: `https://id.twitch.tv/oauth2/authorize` },
    access: { url: 'https://id.twitch.tv/oauth2/token' },
    refresh: { url: 'https://id.twitch.tv/oauth2/token' },
    identify: async ({ accessToken, clientId }) => {
      const api = new TwitchAPI(clientId);
      const result = await api.getUser({ accessToken });
      return {
        id: result.id,
        name: result.displayName,
      };
    },
    parseToken: (json) => ({
      accessToken: json.access_token,
      expiresAt: secondsFromNow(json.expires_in),
      refreshToken: json.refresh_token,
      scopes: json.scope,
      tokenType: json.token_type,
    }),
    shouldRefresh: (integration, error) =>
      Boolean(integration.refreshToken) &&
      error instanceof TRPCError &&
      error.code === 'UNAUTHORIZED',
  },
  [IntegrationProvider.TWITTER]: {
    provider: IntegrationProvider.TWITTER,
    type: IntegrationType.OAUTH,
    name: 'X (Twitter)',
    clientId: process.env['TWITTER_CLIENT_ID'] || '',
    clientSecret: process.env['TWITTER_CLIENT_SECRET'] || '',
    pkce: true,
    scopes: ['users.read', 'tweet.read', 'offline.access'],
    authorize: { url: `https://twitter.com/i/oauth2/authorize` },
    access: {
      url: 'https://api.twitter.com/2/oauth2/token',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env['TWITTER_CLIENT_ID']}:${process.env['TWITTER_CLIENT_SECRET']}`
        ).toString('base64')}`,
      },
    },
    refresh: {
      url: 'https://api.twitter.com/2/oauth2/token',
    },
    identify: async ({ accessToken }) => {
      const result = await fetch('https://api.twitter.com/2/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await result.json();
      if (!result.ok) {
        console.error('Failed to identify user', json);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to identify user',
          cause: json,
        });
      }
      if (json.data.length < 1) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to identify user',
          cause: 'No data returned',
        });
      }
      const user = json.data;

      console.info(`Twitter user identified`, user);
      return {
        id: user.id,
        name: user.name,
      };
    },
    parseToken: (json) => ({
      accessToken: json.access_token,
      expiresAt: secondsFromNow(json.expires_in),
      refreshToken: json.refresh_token,
      scopes: json.scope.split(' '),
      tokenType: json.token_type,
    }),
    shouldRefresh: (integration, error) =>
      isExpired(integration.expiresAt) ||
      (error instanceof TRPCError && error.code === 'UNAUTHORIZED'),
  },
  [IntegrationProvider.DISCORD]: {
    provider: IntegrationProvider.DISCORD,
    type: IntegrationType.OAUTH,
    name: 'Discord',
    clientId: process.env['DISCORD_CLIENT_ID'] || '',
    clientSecret: process.env['DISCORD_CLIENT_SECRET'] || '',
    scopes: ['identify', 'guilds.members.read'],
    authorize: {
      url: 'https://discord.com/oauth2/authorize',
    },
    access: {
      url: 'https://discord.com/api/oauth2/token',
    },
    refresh: {
      url: 'https://discord.com/api/oauth2/token',
    },
    shouldRefresh: (integration, error) =>
      isExpired(integration.expiresAt) ||
      (error instanceof TRPCError && error.code === 'UNAUTHORIZED'),
    identify: async ({ accessToken }) => {
      const api = new DiscordAPI();
      const user = await api.getUser({ accessToken });

      return {
        id: user.id,
        name: `${user.name} (${user.username})`,
      };
    },
    parseToken: (json) => ({
      accessToken: json.access_token,
      expiresAt: secondsFromNow(json.expires_in),
      refreshToken: json.refresh_token,
      scopes: json.scope.split(' '),
      tokenType: json.token_type,
    }),
  },
};

export const API_KEY_CONFIG: Record<'STEAM', APIKeyConfig> = {
  [IntegrationProvider.STEAM]: {
    name: 'Steam Games',
    provider: IntegrationProvider.STEAM,
    type: IntegrationType.API_KEY,
    label: 'Steam ID',
    placeholder: 'Enter your Steam ID',
    identify: async ({ apiKey }) => {
      const api = new SteamAPI();
      const user = await api.getUser({ accountId: apiKey });

      console.info(`Found steam user`, user);

      try {
        await api.getWishlist({ accountId: apiKey });
      } catch (error) {
        if (error instanceof TRPCError && error.code === 'UNAUTHORIZED') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message:
              "User's wishlist is private. Please make it public and try again. If you need help, please contact support.",
          });
        }
      }

      return {
        id: user.steamid,
        name: user.personaname,
      };
    },
  },
};
