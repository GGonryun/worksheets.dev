const CHARITY_GAMES_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ||
    process.env['CHARITY_GAMES_BASE_URL'] ||
    process.env['BASE_URL']) ??
  '';

const CHARITY_GAMES_BLOG_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_BLOG_BASE_URL'] ??
  process.env['BLOG_BASE_URL'] ??
  '';

const CHARITY_GAMES_API_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_API_BASE_URL'] ??
  process.env['API_BASE_URL'] ??
  '';

const CHARITY_GAMES_DEV_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_DEV_BASE_URL'] ??
  process.env['DEV_BASE_URL'] ??
  ''; // fallback to empty string if not defined

if (!CHARITY_GAMES_BASE_URL) {
  throw new Error('Failed to build routes: CHARITY_GAMES_BASE_URL is required');
}

if (!CHARITY_GAMES_BLOG_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_BLOG_BASE_URL is required'
  );
}

if (!CHARITY_GAMES_API_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_API_BASE_URL is required'
  );
}

if (!CHARITY_GAMES_DEV_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_DEV_BASE_URL is required. This is used for dev routes.'
  );
}

export const APP_BASE_URL = CHARITY_GAMES_BASE_URL;

export const BLOG_BASE_URL = CHARITY_GAMES_BLOG_BASE_URL;

export const API_BASE_URL = CHARITY_GAMES_API_BASE_URL;
export const DEV_BASE_URL = CHARITY_GAMES_DEV_BASE_URL;
