import { DiscordAPI } from '@worksheets/api/discord';
import {
  IntegrationProvider,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { OAuthService } from '@worksheets/services/integrations';

export class DiscordService {
  #oauth: OAuthService;
  #api: DiscordAPI;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#oauth = new OAuthService(db, IntegrationProvider.DISCORD);
    this.#api = new DiscordAPI();
  }

  async isGuildMember(opts: { userId: string; guildId: string }) {
    const { userId, guildId } = opts;

    return this.#oauth.useAccessToken(
      userId,
      async ({ accessToken, identity }) =>
        this.#api.isGuildMember({
          accessToken,
          userId: identity.id,
          guildId,
        })
    );
  }
}
