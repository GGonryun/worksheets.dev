import { TRPCError } from '@trpc/server';

type DiscordChannel = 'admin' | 'public';

export type DiscordMessageInput = {
  content: string;
  embeds?: {
    title: string;
    description?: string;
    color?: number;
    url?: string;
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

  async #get(path: string, opts: RequestInit) {
    const url = encodeURI(`${this.#baseUrl}${path}`);
    console.info(`Discord API GET ${url}`, opts);
    const result = await fetch(url, opts);

    if (!result.ok || result.status >= 400) {
      const cause = await result.json();
      console.error(`Discord API GET ${url} failed`, cause);

      if (result.status === 401) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized to access Discord API',
          cause,
        });
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to access Discord API',
        cause,
      });
    }

    return await result.json();
  }

  async getUser(opts: {
    accessToken: string;
  }): Promise<{ id: string; username: string; name: string }> {
    const { accessToken } = opts;

    const json = await this.#get(`/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if ('id' in json && 'username' in json && 'global_name' in json) {
      return {
        id: json.id,
        username: json.username,
        name: json.global_name,
      };
    }

    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Failed to identify user',
      cause: json,
    });
  }

  async isGuildMember(opts: {
    accessToken: string;
    userId: string;
    guildId: string;
  }): Promise<boolean> {
    const { accessToken, guildId, userId } = opts;

    const result = await this.#get(`/users/@me/guilds/${guildId}/member`, {
      headers: this.#headers(accessToken),
    });

    return 'user' in result && result.user && result.user.id === userId;
  }

  async message(options: DiscordMessageInput) {
    const DEFAULT_DISCORD_AVATAR = `https://cdn.charity.games/_developers/charity-games.png`;
    const DEFAULT_DISCORD_USERNAME = `Charity Games Bot`;
    const CHANNEL_WEBHOOKS: Record<DiscordChannel, string> = {
      admin: process.env['DISCORD_ADMIN_WEBHOOK_URL'] ?? '',
      public: process.env['DISCORD_PUBLIC_WEBHOOK_URL'] ?? '',
    };

    const { content, embeds, channel, avatar_url, username } = options;

    const webhookUrl = CHANNEL_WEBHOOKS[channel];

    try {
      const response = await fetch(webhookUrl, {
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

      if (!response.ok) {
        console.error(
          `[${response.status}] Failed to send Discord message`,
          await response.text()
        );
      }
    } catch (error) {
      console.error(`[500] Failed to send Discord message`, error);
    }

    return 'okay';
  }
}
