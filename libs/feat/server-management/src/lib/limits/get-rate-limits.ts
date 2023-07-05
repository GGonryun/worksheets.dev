import { newServerRateLimitDatabase } from '@worksheets/data-access/server-limits';
import { addDurationToCurrentTime } from '@worksheets/util/time';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export type RequestOptions = {
  id: string;
  meta: string;
  quantity: number;
  interval?: number;
};

// TODO: move to settings

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

export const getReplenishQuantity = async (): Promise<number> =>
  SERVER_SETTINGS.RESOURCE_REPLENISH_QUANTITY;

export const getReplenishInterval = async (
  override?: number
): Promise<number> => {
  const interval = override ?? SERVER_SETTINGS.RESOURCE_REPLENISH_THRESHOLD;
  return addDurationToCurrentTime({
    minutes: interval,
  }).getTime();
};
