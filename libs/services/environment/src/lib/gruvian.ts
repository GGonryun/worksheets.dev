const GRUVIAN_API_KEY = process.env['GRUVIAN_API_KEY'] ?? '';

if (!GRUVIAN_API_KEY) {
  throw new Error('GRUVIAN_API_KEY is not defined');
}

const GRUVIAN_NETWORK_ID = process.env['GRUVIAN_NETWORK_ID'] ?? 48;
const GRUVIAN_EVENT_ID = process.env['GRUVIAN_EVENT_ID'] ?? 8;
export { GRUVIAN_API_KEY, GRUVIAN_NETWORK_ID, GRUVIAN_EVENT_ID };
