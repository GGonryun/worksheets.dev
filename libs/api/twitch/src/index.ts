import { request } from '@worksheets/api/fetch';

export class TwitchAPI {
  #clientId: string;

  constructor(clientId: string) {
    this.#clientId = clientId;
  }

  #headers(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Client-Id': this.#clientId,
    };
  }

  async getUser(opts: {
    accessToken: string;
    username?: string;
  }): Promise<{ id: string; displayName: string }> {
    const { accessToken, username } = opts;
    const params = new URLSearchParams();
    if (username) params.append('login', username);

    const response = await request<{
      data: { id: string; display_name: string }[];
    }>(`https://api.twitch.tv/helix/users?${params}`, {
      headers: this.#headers(accessToken),
    });

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Invalid user information');
    }

    const data = response.data[0];
    return {
      id: data.id,
      displayName: data.display_name,
    };
  }

  async isFollowing(opts: {
    accessToken: string;
    broadcaster: string;
    userId: string;
  }): Promise<boolean> {
    const { accessToken, userId, broadcaster } = opts;

    const bc = await this.getUser({ accessToken, username: broadcaster });

    console.info(`Found ids`, { userId, broadcasterId: bc.id });

    const params = new URLSearchParams();
    params.append('user_id', userId);
    params.append('broadcaster_id', bc.id);

    const result = await request<{ total: number; data: unknown[] }>(
      `https://api.twitch.tv/helix/channels/followed?${params}`,
      {
        headers: this.#headers(accessToken),
      }
    );

    console.info(`Found ${result.total} follows`, result);

    return result.total > 0 && result.data.length > 0;
  }
}
