import {
  ServerRateLimitEntity,
  newServerRateLimitDatabase,
} from '@worksheets/data-access/server-limits';
import { addDurationToCurrentTime } from '@worksheets/util/time';
import { settings } from '../settings';
import { ServerAlertSeverity, alerts } from '../alerts';

type RequestOptions = {
  id: string;
  meta: string;
  quantity: number;
  interval?: number;
};
// TODO: move to settings
const REPLENISH_THRESHOLD = 1;
const REPLENISH_INTERVAL = 1;
const REPLENISH_QUANTITY = 100; // points. 1 request = X.Y points

const db = newServerRateLimitDatabase();

const getRateLimits = async (id: string, meta: string) => {
  if (await db.has(id)) {
    return await db.get(id);
  } else {
    return await db.insert({
      id,
      meta,
      quantity: await getReplenishQuantity(),
      // force replenish after request
      replenish: await getReplenishInterval(),
    });
  }
};

const getReplenishQuantity = async (): Promise<number> => {
  return REPLENISH_QUANTITY;
};

const getReplenishInterval = async (override?: number): Promise<number> => {
  const setting = REPLENISH_INTERVAL;
  const interval = override ?? setting;
  return addDurationToCurrentTime({
    minutes: interval,
  }).getTime();
};

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

  const severity = await calculateAlertThresholdSeverity(percentage);
  if (severity) {
    return await alerts.send({
      severity,
      message: `Server rate limit replenished below acceptable threshold.`,
      data: {
        limit: limits,
        currentLimit,
        defaultLimit,
        percentage,
      },
    });
  }

  return;
};

export const calculateAlertThresholdSeverity = async (
  percentage: number
): Promise<ServerAlertSeverity | undefined> => {
  if (
    await settings.below(
      'replenish-rate-limit-alert-threshold-info',
      percentage
    )
  ) {
    if (
      await settings.below(
        'replenish-rate-limit-alert-threshold-warning',
        percentage
      )
    ) {
      if (
        await settings.below(
          'replenish-rate-limit-alert-threshold-error',
          percentage
        )
      ) {
        return 'error';
      }
      return 'warning';
    }
    return 'info';
  }
  return undefined;
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
    console.info(
      `[RATE_LIMIT][ENABLED] ${limits.meta} (${limits.id}) has exceeded it's rate limit`
    );
    return false;
  }

  limits.quantity -= opts.quantity;
  await db.update(limits);
  return true;
};
