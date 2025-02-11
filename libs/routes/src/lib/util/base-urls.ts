const CHARITY_GAMES_MARKETING_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_MARKETING_BASE_URL'] ||
    process.env['CHARITY_GAMES_MARKETING_BASE_URL'] ||
    process.env['MARKETING_BASE_URL']) ??
  '';

const CHARITY_GAMES_PLAY_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_PLAY_BASE_URL'] ??
  process.env['PLAY_BASE_URL'] ??
  '';

const CHARITY_GAMES_PORTAL_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_PORTAL_BASE_URL'] ??
  process.env['AUTH_BASE_URL'] ??
  '';

const CHARITY_GAMES_BLOG_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_BLOG_BASE_URL'] ??
  process.env['BLOG_BASE_URL'] ??
  '';

const CHARITY_GAMES_API_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_API_BASE_URL'] ??
  process.env['API_BASE_URL'] ??
  '';

const CHARITY_GAMES_HELP_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_HELP_BASE_URL'] ??
  process.env['HELP_BASE_URL'] ??
  '';

const CHARITY_GAMES_CONTESTS_BASE_URL =
  process.env['NEXT_PUBLIC_CHARITY_GAMES_CONTESTS_BASE_URL'] ??
  process.env['CONTESTS_BASE_URL'] ??
  '';

if (!CHARITY_GAMES_MARKETING_BASE_URL) {
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

if (!CHARITY_GAMES_PLAY_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_PLAY_BASE_URL is required'
  );
}

if (!CHARITY_GAMES_PORTAL_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_PORTAL_BASE_URL is required'
  );
}

if (!CHARITY_GAMES_HELP_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_HELP_BASE_URL is required'
  );
}

if (!CHARITY_GAMES_CONTESTS_BASE_URL) {
  throw new Error(
    'Failed to build routes: CHARITY_GAMES_CONTESTS_BASE_URL is required'
  );
}

export const MARKETING_BASE_URL = CHARITY_GAMES_MARKETING_BASE_URL;

export const BLOG_BASE_URL = CHARITY_GAMES_BLOG_BASE_URL;

export const API_BASE_URL = CHARITY_GAMES_API_BASE_URL;

export const PLAY_BASE_URL = CHARITY_GAMES_PLAY_BASE_URL;

export const PORTAL_BASE_URL = CHARITY_GAMES_PORTAL_BASE_URL;

export const HELP_BASE_URL = CHARITY_GAMES_HELP_BASE_URL;

export const CONTESTS_BASE_URL = CHARITY_GAMES_CONTESTS_BASE_URL;
