type SendMessageOptions = {
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
  webhookUrl: string;
};

export const DEFAULT_DISCORD_AVATAR = `https://cdn.charity.games/_developers/charity-games.png`;
export const DEFAULT_DISCORD_USERNAME = `Charity Games Bot`;

export const sendDiscordMessage = async (options: SendMessageOptions) => {
  const { content, embeds, webhookUrl, avatar_url, username } = options;

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
};
