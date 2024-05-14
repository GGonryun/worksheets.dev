const CHARITY_GAMES_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ||
    process.env['CHARITY_GAMES_BASE_URL'] ||
    process.env['BASE_URL']) ??
  '';

const CHARITY_GAMES_BLOG_BASE_URL =
  process.env['NEXT_PUBLIC_BLOG_BASE_URL'] ??
  process.env['BLOG_BASE_URL'] ??
  '';

if (!CHARITY_GAMES_BASE_URL) {
  throw new Error('Failed to build routes: CHARITY_GAMES_BASE_URL is required');
}

if (!CHARITY_GAMES_BLOG_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_BLOG_BASE_URL is required'
  );
}

export const APP_BASE_URL = CHARITY_GAMES_BASE_URL;

export const BLOG_BASE_URL = CHARITY_GAMES_BLOG_BASE_URL;

export const API_BASE_URL = `${APP_BASE_URL}/api`;
