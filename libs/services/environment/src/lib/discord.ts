const DISCORD_WEBHOOK_URL = process.env['DISCORD_WEBHOOK_URL'] ?? '';

if (!DISCORD_WEBHOOK_URL) {
  throw new Error('DISCORD_WEBHOOK_URL is not defined');
}

export { DISCORD_WEBHOOK_URL };
