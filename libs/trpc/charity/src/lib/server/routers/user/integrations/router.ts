import { TRPCError } from '@trpc/server';
import { SteamAPI } from '@worksheets/api/steam';
import { CaptchaService } from '@worksheets/services/captchas';
import { DiscordService } from '@worksheets/services/discord';
import { APIKeyService, OAuthService } from '@worksheets/services/integrations';
import { TwitchService } from '@worksheets/services/twitch';
import { YouTubeService } from '@worksheets/services/youtube';
import {
  APIKeyIntegrationProvider,
  OAuthIntegrationProvider,
  parseAPIKeyIntegrationProvider,
} from '@worksheets/util/integrations';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  oauth: t.router({
    authorize: protectedProcedure
      .input(z.nativeEnum(OAuthIntegrationProvider))
      .output(z.string())
      .mutation(async ({ ctx: { db, user }, input }) => {
        const oauth = new OAuthService(db, input);
        return await oauth.authorize(user.id);
      }),
    revoke: protectedProcedure
      .input(z.nativeEnum(OAuthIntegrationProvider))
      .mutation(async ({ ctx: { db, user }, input }) => {
        const oauth = new OAuthService(db, input);
        return await oauth.revoke(user.id);
      }),
    identity: protectedProcedure
      .input(z.nativeEnum(OAuthIntegrationProvider))
      .output(
        z.custom<Awaited<ReturnType<OAuthService['identity']>>>().nullable()
      )
      .query(async ({ ctx: { db, user }, input }) => {
        const oauth = new OAuthService(db, input);
        return await oauth.identity(user.id);
      }),
  }),
  apiKey: t.router({
    identity: protectedProcedure
      .input(z.nativeEnum(APIKeyIntegrationProvider))
      .output(
        z.custom<Awaited<ReturnType<APIKeyService['identity']>>>().nullable()
      )
      .query(async ({ ctx: { db, user }, input }) => {
        const keys = new APIKeyService(db, input);
        return await keys.identity(user.id);
      }),
    authorize: protectedProcedure
      .input(z.nativeEnum(APIKeyIntegrationProvider))
      .output(z.string())
      .mutation(async ({ ctx: { db, user }, input }) => {
        const keys = new APIKeyService(db, input);
        return await keys.authorize(user.id);
      }),
    secure: protectedProcedure
      .input(
        z.object({
          integrationId: z.string(),
          apiKey: z.string(),
        })
      )
      .mutation(
        async ({ ctx: { db, user }, input: { apiKey, integrationId } }) => {
          const integration = await db.integration.findFirst({
            where: {
              id: integrationId,
              userId: user.id,
            },
          });

          if (!integration) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Integration does not exist',
            });
          }

          const [providerId, valid] = parseAPIKeyIntegrationProvider(
            integration.provider
          );

          if (!valid) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Invalid API Key provider',
            });
          }

          const keys = new APIKeyService(db, providerId);
          return await keys.secure(integration, apiKey);
        }
      ),
    revoke: protectedProcedure
      .input(z.nativeEnum(APIKeyIntegrationProvider))
      .mutation(async ({ ctx: { db, user }, input }) => {
        const keys = new APIKeyService(db, input);
        return await keys.revoke(user.id);
      }),
  }),
  twitch: t.router({
    isFollowing: protectedProcedure
      .input(
        z.object({
          broadcaster: z.string(),
        })
      )
      .output(z.boolean())
      .mutation(async ({ ctx: { db, user }, input: { broadcaster } }) => {
        const twitch = new TwitchService(db);
        return await twitch.isFollowing(user.id, broadcaster);
      }),
  }),
  discord: t.router({
    isGuildMember: protectedProcedure
      .input(
        z.object({
          guildId: z.string(),
        })
      )
      .output(z.boolean())
      .mutation(async ({ ctx: { db, user }, input: { guildId } }) => {
        const discord = new DiscordService(db);

        return await discord.isGuildMember({
          userId: user.id,
          guildId,
        });
      }),
  }),
  youtube: t.router({
    isSubscribed: protectedProcedure
      .input(
        z.object({
          channelId: z.string(),
        })
      )
      .output(z.boolean())
      .mutation(async ({ ctx: { db, user }, input: { channelId } }) => {
        const service = new YouTubeService(db);
        return service.isSubscribed({ userId: user.id, channelId });
      }),
  }),
  steam: t.router({
    hasGameInWishlist: protectedProcedure
      .input(
        z.object({
          appId: z.string(),
        })
      )
      .output(z.boolean())
      .mutation(async ({ ctx: { db, user }, input: { appId } }) => {
        const steam = new SteamAPI();
        const keys = new APIKeyService(db, APIKeyIntegrationProvider.STEAM);
        return await keys.useApiKey(user.id, async ({ apiKey }) => {
          return await steam.hasGameInWishlist({ accountId: apiKey, appId });
        });
      }),
  }),
  recaptcha: t.router({
    verify: protectedProcedure
      .input(z.custom<Parameters<CaptchaService['verify']>[1]>())
      .output(z.custom<Awaited<ReturnType<CaptchaService['verify']>>>())
      .mutation(async ({ input, ctx: { user } }) => {
        const captcha = new CaptchaService();
        return captcha.verify(user.id, input);
      }),
  }),
});
