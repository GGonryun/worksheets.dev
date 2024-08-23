import { request } from '@worksheets/api/fetch';

type DiscordChannel = 'admin' | 'public' | 'notification';

export type DiscordMessageInput = {
  content: string;
  embeds?: {
    title: string;
    description?: string;
    color?: number;
    url?: string;
    image?: {
      url: string;
    };
    fields?: {
      name: string;
      value: string;
    }[];
  }[];
  avatar_url?: string;
  username?: string;
  channel: DiscordChannel;
};

export class DiscordAPI {
  #baseUrl = `https://discord.com/api`;

  #headers(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async getUser(opts: {
    accessToken: string;
  }): Promise<{ id: string; username: string; name: string }> {
    const { accessToken } = opts;

    const json = await request<{
      id: string;
      username: string;
      global_name: string;
    }>(`${this.#baseUrl}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      id: json.id,
      username: json.username,
      name: json.global_name,
    };
  }

  async isGuildMember(opts: {
    accessToken: string;
    userId: string;
    guildId: string;
  }): Promise<boolean> {
    const { accessToken, guildId, userId } = opts;

    const result = await request<{
      user?: {
        id?: string;
      };
    }>(`${this.#baseUrl}/users/@me/guilds/${guildId}/member`, {
      headers: this.#headers(accessToken),
    });

    return result?.user?.id === userId;
  }

  async message(options: DiscordMessageInput) {
    if (process.env['SILENCE_DISCORD'] === 'true') {
      return 'silenced';
    }
    const DEFAULT_DISCORD_AVATAR = `https://cdn.charity.games/_developers/charity-games.png`;
    const DEFAULT_DISCORD_USERNAME = `Charity Games Bot`;
    const CHANNEL_WEBHOOKS: Record<DiscordChannel, string> = {
      admin: process.env['DISCORD_ADMIN_WEBHOOK_URL'] ?? '',
      public: process.env['DISCORD_PUBLIC_WEBHOOK_URL'] ?? '',
      notification: process.env['DISCORD_NOTIFICATION_WEBHOOK_URL'] ?? '',
    };

    const { content, embeds, channel, avatar_url, username } = options;

    const webhookUrl = CHANNEL_WEBHOOKS[channel];

    try {
      const result = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          embeds,
          avatar_url: avatar_url ?? DEFAULT_DISCORD_AVATAR,
          username: username ?? DEFAULT_DISCORD_USERNAME,
        }),
      });
      if (!result.ok) {
        console.error(
          `[${result.status}] Failed to send Discord message`,
          result
        );
      }
    } catch (error) {
      console.error(`[500] Failed to send Discord message`, error);
    }

    return 'okay';
  }
}
