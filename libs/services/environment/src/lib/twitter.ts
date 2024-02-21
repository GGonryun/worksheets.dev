const TWITTER_API_KEY = process.env['TWITTER_API_KEY'] ?? '';

const TWITTER_API_SECRET = process.env['TWITTER_API_SECRET'] ?? '';

const TWITTER_ACCESS_TOKEN_KEY = process.env['TWITTER_ACCESS_TOKEN_KEY'] ?? '';

const TWITTER_ACCESS_TOKEN_SECRET =
  process.env['TWITTER_ACCESS_TOKEN_SECRET'] ?? '';

const TWITTER_CLIENT_ID = process.env['TWITTER_CLIENT_ID'] ?? '';
const TWITTER_CLIENT_SECRET = process.env['TWITTER_CLIENT_SECRET'] ?? '';

if (!TWITTER_API_KEY) {
  throw new Error('TWITTER_API_KEY is not defined');
}

if (!TWITTER_API_SECRET) {
  throw new Error('TWITTER_API_SECRET is not defined');
}

if (!TWITTER_ACCESS_TOKEN_KEY) {
  throw new Error('TWITTER_ACCESS_TOKEN_KEY is not defined');
}

if (!TWITTER_ACCESS_TOKEN_SECRET) {
  throw new Error('TWITTER_ACCESS_TOKEN_SECRET is not defined');
}

if (!TWITTER_CLIENT_ID) {
  throw new Error('TWITTER_CLIENT_ID is not defined');
}

if (!TWITTER_CLIENT_SECRET) {
  throw new Error('TWITTER_CLIENT_SECRET is not defined');
}

export {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
};
