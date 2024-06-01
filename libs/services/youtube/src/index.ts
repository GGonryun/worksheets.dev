import { YouTubeAPI } from '@worksheets/api/youtube';
import {
  IntegrationProvider,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { OAuthService } from '@worksheets/services/integrations';

export class YouTubeService {
  #oauth: OAuthService;
  #api: YouTubeAPI;

  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#oauth = new OAuthService(db, IntegrationProvider.YOUTUBE);
    this.#api = new YouTubeAPI();
  }

  async isSubscribed({
    userId,
    channelId,
  }: {
    userId: string;
    channelId: string;
  }) {
    console.info(`Checking if user is subscribed to channel`, {
      userId,
      channelId,
    });

    return await this.#oauth.useAccessToken(userId, async ({ accessToken }) =>
      this.#api.isSubscribed({
        accessToken,
        forChannelId: channelId,
      })
    );
  }
}
