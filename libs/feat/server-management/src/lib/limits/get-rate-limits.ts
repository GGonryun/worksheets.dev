import { newServerRateLimitDatabase } from '@worksheets/data-access/server-limits';
import { addDurationToCurrentTime } from '@worksheets/util/time';

export type RequestOptions = {
  id: string;
  meta: string;
  quantity: number;
  interval?: number;
};

// TODO: move to settings
const REPLENISH_INTERVAL = 1;
const REPLENISH_QUANTITY = 100; // points. 1 request = X.Y points

const db = newServerRateLimitDatabase();

export const getRateLimits = async (id: string, meta: string) => {
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

export const getReplenishQuantity = async (): Promise<number> => {
  return REPLENISH_QUANTITY;
};

export const getReplenishInterval = async (
  override?: number
): Promise<number> => {
  const setting = REPLENISH_INTERVAL;
  const interval = override ?? setting;
  return addDurationToCurrentTime({
    minutes: interval,
  }).getTime();
};
