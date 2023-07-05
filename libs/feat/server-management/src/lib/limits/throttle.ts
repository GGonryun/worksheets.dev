import {
  ServerRateLimitEntity,
  newServerRateLimitDatabase,
} from '@worksheets/data-access/server-limits';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

import {
  RequestOptions,
  getRateLimits,
  getReplenishInterval,
  getReplenishQuantity,
} from './get-rate-limits';

const db = newServerRateLimitDatabase();

const shouldReplenish = async (limits: ServerRateLimitEntity) => {
  // check our proximity to the quntity limit
  const ratio = limits.quantity / (await getReplenishQuantity());
  if (ratio > SERVER_SETTINGS.RESOURCE_REPLENISH_THRESHOLD) {
    return false;
  }

  return limits.replenish < Date.now();
};

// all identifiers have the same flat rate limit
export const throttle = async (opts: RequestOptions) => {
  const limits = await getRateLimits(opts.id, opts.meta);
  if (await shouldReplenish(limits)) {
    const old = limits.quantity;
    limits.quantity = await getReplenishQuantity();
    limits.replenish = await getReplenishInterval(opts.interval);
    await db.update(limits);
    console.info(
      `[RATE_LIMIT][REFRESH] rate limit for ${limits.meta} (${limits.id}) from ${old} to ${limits.quantity}`
    );
  }

  if (limits.quantity <= 0) {
    console.warn(
      `[RATE_LIMIT][ENABLED] ${limits.meta} (${limits.id}) has exceeded it's rate limit`
    );
    return false;
  }

  limits.quantity -= opts.quantity;
  await db.update(limits);
  return true;
};
