export const SERVER_SETTINGS = {
  VERSION: 0,

  ENVIRONMENT: {
    IS_PRODUCTION: () => process.env['NODE_ENV'] === 'production',
    CURRENT: () => process.env['NODE_ENV'] ?? 'unknown',
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    VARIABLES: {
      FIREBASE: {
        PROJECT_ID: () => process.env['FIREBASE_PROJECT_ID'] ?? '',
      },
      ERROR_REPORTING: {
        MODE: 'production',
      },
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
    ADMIN_URL: (route = '') =>
      (process.env['ADMIN_BASE_URL'] ??
        process.env['NEXT_PUBLIC_ADMIN_BASE_URL'] ??
        '') + route,
    MARKETING_URL: (route = '') =>
      (process.env['MARKETING_BASE_URL'] ??
        process.env['NEXT_PUBLIC_MARKETING_BASE_URL'] ??
        '') + route,
    APP_URL: (route = '') =>
      (process.env['APP_BASE_URL'] ??
        process.env['NEXT_PUBLIC_APP_BASE_URL'] ??
        '') + route,
    API_URL: (route = '') =>
      (process.env['API_BASE_URL'] ??
        process.env['NEXT_PUBLIC_API_BASE_URL'] ??
        '') + route,
    DOCS_URL: (route = '') =>
      (process.env['DOCS_BASE_URL'] ??
        process.env['NEXT_PUBLIC_DOCS_BASE_URL'] ??
        '') + route,
    EMOJI_WAR_URL: (route = '') =>
      (process.env['EMOJI_WAR_BASE_URL'] ??
        process.env['NEXT_PUBLIC_EMOJI_WAR_BASE_URL'] ??
        '') + route,
    PUZZLE_WORDS_URL: (route = '') =>
      (process.env['PUZZLE_WORDS_BASE_URL'] ??
        process.env['NEXT_PUBLIC_PUZZLE_WORDS_BASE_URL'] ??
        '') + route,
    WORD_SEARCH_URL: (route = '') =>
      (process.env['WORD_SEARCH_BASE_URL'] ??
        process.env['NEXT_PUBLIC_WORD_SEARCH_BASE_URL'] ??
        '') + route,
    WORD_PACK_URL: (route = '') =>
      (process.env['WORD_PACK_BASE_URL'] ??
        process.env['NEXT_PUBLIC_WORD_PACK_BASE_URL'] ??
        '') + route,
    WORD_SMITH_URL: (route = '') =>
      (process.env['WORD_SMITH_BASE_URL'] ??
        process.env['NEXT_PUBLIC_WORD_SMITH_BASE_URL'] ??
        '') + route,
  },
  HANDSHAKE_EXPIRATION_OFFSET: 5 * 60 * 1000, // expire handshakes older than 5 minutes in ms
  RESOURCE_REPLENISH_QUANTITY: 100, //replenishes every threshold minutes.
  RESOURCE_REPLENISH_THRESHOLD: 1,
  RESOURCE_CONSUMPTION: {
    USER_WORKSHEET_EXECUTION: 1,
    SYSTEM_WORKSHEET_EXECUTIONS: 2,
    INDIVIDUAL_WORKSHEET_EXECUTION: 10,
    USER_METHOD_CALL: 1,
    USER_PROCESSING_TIME: (ms: number) => ms,
  },
  PROCESSING_DEADLINES: {
    MAX_PROCESSOR_RUNTIME: 20 * 1000, //ms
    METHOD_CALL_TIMEOUT: 10 * 1000, //ms
    TASK_REQUEUE_LIMIT: 30, //requeues
    DEFAULT_TASK_TIMEOUT: 60 * 1000, //ms
    CRON_POLLING_FREQUENCY: 1, //minutes
  },
  LOGGING: {
    MAX_LOGS_PER_TASK: 100,
  },
  CONSOLE_ERROR_THRESHOLD: 0.3,
  USER_ERRORS: {
    TOO_MANY_METHOD_CALLS:
      'You have exceeded your maximum allowed method calls. Contact customer support to increase your quota.',
    TOO_MUCH_PROCESSING_TIME:
      'You have exceeded your processing capacity. Contact customer support to increase your quota.',
  },
  SYSTEM_ERRORS: {
    TOO_MUCH_PROCESSING_TIME:
      'Our rate limiters are currently preventing processing requests at this time. Try again shortly.',
    TOO_MANY_METHOD_CALLS:
      'Our rate limiters are currently preventing method calls at this time. Try again shortly.',
    TOO_MANY_SPECIFIC_METHOD_CALLS: (appId: string, methodId: string) =>
      `Our rate limiters are currently preventing method calls for ${appId}/${methodId} at this time. Try again later.`,
  },
  TASK_CREATION: {
    DEFAULT_VERBOSITY: 'info' as const,
  },
  REAPER: {
    FREQUENCIES: {
      DELETE_EXECUTION_HISTORY: -1 * 8 * 60, // older than 8 hours in minutes
      DELETE_EXECUTION_LOGS: -1 * 60, // older than 1 hour in minutes
      DELETE_RATE_LIMITS: -1 * 5, // older than 5 minutes.
      DELETE_HANDSHAKES: -1 * 10, // older than 10 minutes.
    },
    QUANTITIES: {
      HANDSHAKES: 300,
      EXECUTIONS: 100,
      RATE_LIMITS: 100,
      EXECUTION_HISTORY: 100,
      EXECUTION_LOGS: 2000,
    },
  },
  FIRESTORE: {
    BATCH_SIZE: 400, // firestore supports batch writes of up to 500. keeping the max batch at 400 to be safe.
  },
};

export const SERVICE_SETTINGS = {
  FULLSTORY: {
    orgId: 'o-1N7VNF-na1',
    devMode: !SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION(),
  },
};
