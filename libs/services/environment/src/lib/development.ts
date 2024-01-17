const { VERCEL_ENV } = process.env;

const IS_DEVELOPMENT = VERCEL_ENV === 'development';
const IS_PRODUCTION = !IS_DEVELOPMENT;

export { IS_DEVELOPMENT, IS_PRODUCTION };
