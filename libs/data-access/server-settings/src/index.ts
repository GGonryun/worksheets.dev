export const SERVER_SETTINGS = {
  VERSION: 0,

  ENVIRONMENT: {
    IS_PRODUCTION: () => process.env['NODE_ENV'] === 'production',
    COOKIE_DOMAIN: () => process.env['NEXT_PUBLIC_COOKIE_DOMAIN'] ?? '',
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    VARIABLES: {
      GCP: {
        PROJECT_ID: () => process.env['GCP_PROJECT_ID'] ?? '',
        PRIVATE_KEY_ID: () => process.env['GCP_PRIVATE_KEY_ID'] ?? '',
        PRIVATE_KEY: () => process.env['GCP_PRIVATE_KEY'] ?? '',
        CLIENT_EMAIL: () => process.env['GCP_CLIENT_EMAIL'] ?? '',
        CLIENT_ID: () => process.env['GCP_CLIENT_ID'] ?? '',
      },
      FULLSTORY: {
        API_KEY: () => process.env['FULLSTORY_API_KEY'] ?? '',
      },
    },
  },
  WEBSITES: {
    // LEGIT SITES
    WORKSHEETS_URL: (route = '') =>
      process.env['NEXT_PUBLIC_WORKSHEETS_BASE_URL'] ?? '' + route,
    CHARITY_GAMES_URL: (route = '') =>
      process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ?? '' + route,
    EMOJI_WAR_URL: (route = '') =>
      process.env['NEXT_PUBLIC_EMOJI_WAR_BASE_URL'] ?? '' + route,
    PUZZLE_WORDS_URL: (route = '') =>
      process.env['NEXT_PUBLIC_PUZZLE_WORDS_BASE_URL'] ?? '' + route,
    WORD_SEARCH_URL: (route = '') =>
      process.env['NEXT_PUBLIC_WORD_SEARCH_BASE_URL'] ?? '' + route,
    WORD_PACK_URL: (route = '') =>
      process.env['NEXT_PUBLIC_WORD_PACK_BASE_URL'] ?? '' + route,
    WORD_SMITH_URL: (route = '') =>
      process.env['NEXT_PUBLIC_WORD_SMITH_BASE_URL'] ?? '' + route,
    NONOGRAMS_URL: (route = '') =>
      process.env['NEXT_PUBLIC_NONOGRAMS_BASE_URL'] ?? '' + route,
    SOLITAIRE_URL: (route = '') =>
      process.env['NEXT_PUBLIC_SOLITAIRE_BASE_URL'] ?? '' + route,
  },
};

export const SERVICE_SETTINGS = {
  FULLSTORY: {
    orgId: 'o-1N7VNF-na1',
    devMode: !SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION(),
    cookieDomain: SERVER_SETTINGS.ENVIRONMENT.COOKIE_DOMAIN(),
  },
};
