import { request } from '@worksheets/api/fetch';

export class YouTubeAPI {
  async #headers(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async getUser({ accessToken }: { accessToken: string }) {
    const result = await request<{
      id: string;
      name: string;
      given_name: string;
      family_name: string;
      link: string;
      picture: string;
      gender: string;
      locale: string;
    }>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: await this.#headers(accessToken),
      }
    );

    console.log('YouTubeAPI.getUser', { result });

    return {
      id: result.id,
      name: result.name,
    };
  }

  async isSubscribed({
    forChannelId,
    accessToken,
  }: {
    accessToken: string;
    forChannelId: string;
  }) {
    const params = new URLSearchParams({
      part: 'snippet',
      forChannelId,
      mine: 'true',
    });
    const result = await request<{
      items: {
        id: string;
        snippet: {
          title: string;
          description: string;
          publishedAt: string;
          resourceId: {
            channelId: string;
          };
        };
      }[];
    }>(`https://www.googleapis.com/youtube/v3/subscriptions?${params}`, {
      headers: await this.#headers(accessToken),
    });

    console.info('YouTubeAPI.getSubscriptions', {
      result: result.items.map((i) => i.snippet),
    });

    return result.items.some(
      (i) => i.snippet.resourceId.channelId === forChannelId
    );
  }
}
