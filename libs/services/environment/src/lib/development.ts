const { VERCEL_ENV } = process.env;

const IS_DEVELOPMENT = VERCEL_ENV === 'development';

export { IS_DEVELOPMENT };
