const EMOJI_WAR_URL = process.env['NEXT_PUBLIC_EMOJI_WAR_BASE_URL'] ?? '';
const PUZZLE_WORDS_URL = process.env['NEXT_PUBLIC_PUZZLE_WORDS_BASE_URL'] ?? '';
const WORD_SEARCH_URL = process.env['NEXT_PUBLIC_WORD_SEARCH_BASE_URL'] ?? '';
const WORD_PACK_URL = process.env['NEXT_PUBLIC_WORD_PACK_BASE_URL'] ?? '';
const WORD_SMITH_URL = process.env['NEXT_PUBLIC_WORD_SMITH_BASE_URL'] ?? '';
const NONOGRAMS_URL = process.env['NEXT_PUBLIC_NONOGRAMS_BASE_URL'] ?? '';
const SOLITAIRE_URL = process.env['NEXT_PUBLIC_SOLITAIRE_BASE_URL'] ?? '';
const CHARITY_GAMES_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ||
    process.env['CHARITY_GAMES_BASE_URL'] ||
    process.env['BASE_URL']) ??
  '';
const BLOG_BASE_URL =
  process.env['NEXT_PUBLIC_BLOG_BASE_URL'] ??
  process.env['BLOG_BASE_URL'] ??
  '';

const COOKIE_DOMAIN = process.env['NEXT_PUBLIC_COOKIE_DOMAIN'] ?? '';
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';
const IS_DEVELOPMENT = process.env['NODE_ENV'] !== 'production';

export {
  CHARITY_GAMES_BASE_URL,
  BLOG_BASE_URL,
  EMOJI_WAR_URL,
  PUZZLE_WORDS_URL,
  WORD_SEARCH_URL,
  WORD_PACK_URL,
  WORD_SMITH_URL,
  NONOGRAMS_URL,
  SOLITAIRE_URL,
  COOKIE_DOMAIN,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};
