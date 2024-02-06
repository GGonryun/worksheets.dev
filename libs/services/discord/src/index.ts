type SendMessageOptions = {
  content: string;
  embeds?: {
    title: string;
    description?: string;
    color?: number;
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
    throw new Error(`Failed to send Discord message: ${response.statusText}`);
  }

  return 'okay';
};
