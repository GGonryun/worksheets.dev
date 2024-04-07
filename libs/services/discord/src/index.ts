import {
  DISCORD_ADMIN_WEBHOOK_URL,
  DISCORD_PUBLIC_WEBHOOK_URL,
} from '@worksheets/services/environment';

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

const CHANNEL_WEBHOOKS: Record<DiscordChannel, string> = {
  admin: DISCORD_ADMIN_WEBHOOK_URL,
  public: DISCORD_PUBLIC_WEBHOOK_URL,
};

export const DEFAULT_DISCORD_AVATAR = `https://cdn.charity.games/_developers/charity-games.png`;
export const DEFAULT_DISCORD_USERNAME = `Charity Games Bot`;

export class DiscordService {
  async message(options: DiscordMessageInput) {
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
