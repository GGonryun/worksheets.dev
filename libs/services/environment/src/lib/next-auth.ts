const { NEXTAUTH_URL: NEXTAUTH_URL_RAW } = process.env;

if (!NEXTAUTH_URL_RAW) {
  throw new Error('NEXTAUTH_URL is not defined');
}

const NEXTAUTH_URL: string = NEXTAUTH_URL_RAW;

export { NEXTAUTH_URL };
