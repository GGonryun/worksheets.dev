import {
  ServerRateLimitEntity,
  newServerRateLimitDatabase,
} from '@worksheets/data-access/server-limits';

import {
  RequestOptions,
  getRateLimits,
  getReplenishInterval,
  getReplenishQuantity,
} from './get-rate-limits';

const REPLENISH_THRESHOLD = 1;
const CONSOLE_ERROR_THRESHOLD = 0.3;

const db = newServerRateLimitDatabase();

const shouldReplenish = async (limits: ServerRateLimitEntity) => {
  // check our proximity to the quntity limit
  const ratio = limits.quantity / (await getReplenishQuantity());
  if (ratio > REPLENISH_THRESHOLD) {
    return false;
  }

  return limits.replenish < Date.now();
};

const alertProximityToLimit = async (limits: ServerRateLimitEntity) => {
  // get default value
  const defaultLimit = await getReplenishQuantity();

  // get current value
  const currentLimit = limits.quantity;

  // alert if we were close to running out of resources
  const percentage = currentLimit > 0 ? currentLimit / defaultLimit : 0;

  if (percentage < CONSOLE_ERROR_THRESHOLD) {
    console.error(`Server rate limit replenished below acceptable threshold.`);
  }

  return;
};

// all identifiers have the same flat rate limit
export const throttle = async (opts: RequestOptions) => {
  const limits = await getRateLimits(opts.id, opts.meta);
  if (await shouldReplenish(limits)) {
    await alertProximityToLimit(limits);

    const old = limits.quantity;
    limits.quantity = await getReplenishQuantity();
    limits.replenish = await getReplenishInterval(opts.interval);
    await db.update(limits);
    console.info(
      `[RATE_LIMIT][REFRESH] rate limit for ${limits.meta} (${limits.id}) from ${old} to ${limits.quantity}`
    );
  }

  if (limits.quantity <= 0) {
    console.error(
      `[RATE_LIMIT][ENABLED] ${limits.meta} (${limits.id}) has exceeded it's rate limit`
    );
    return false;
  }

  limits.quantity -= opts.quantity;
  await db.update(limits);
  return true;
};
