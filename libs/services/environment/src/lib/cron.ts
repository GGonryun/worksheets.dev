const { CRON_SECRET: CRON_SECRET_RAW } = process.env;

if (!CRON_SECRET_RAW) {
  throw new Error('CRON_SECRET is not defined');
}

const CRON_SECRET: string = CRON_SECRET_RAW;

export { CRON_SECRET };
