import { TwitchAPI } from '@worksheets/api/twitch';
import {
  IntegrationProvider,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { OAuthService } from '@worksheets/services/integrations';

export class TwitchService {
  #oauth: OAuthService;
  #api: TwitchAPI;

  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#oauth = new OAuthService(db, IntegrationProvider.TWITCH);
    this.#api = new TwitchAPI(this.#oauth.config.clientId);
  }

  async isFollowing(userId: string, broadcaster: string) {
    console.info(`Checking if user is following broadcaster`, {
      userId,
      broadcaster,
    });

    return await this.#oauth.useAccessToken(
      userId,
      async ({ accessToken, identity }) =>
        this.#api.isFollowing({ accessToken, userId: identity.id, broadcaster })
    );
  }
}
