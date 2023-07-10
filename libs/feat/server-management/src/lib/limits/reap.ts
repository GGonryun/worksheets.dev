import { newServerRateLimitDatabase } from '@worksheets/data-access/server-limits';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

// in minutes

const db = newServerRateLimitDatabase();

export const reapRateLimits = async (
  quantity: number = SERVER_SETTINGS.REAPER.QUANTITIES.RATE_LIMITS
) => {
  console.info(
    `[REAP][LIMITS][REQ] searching for at most ${quantity} expired limits`
  );

  const docs = await db.collection
    .limit(quantity)
    .where(
      'replenish',
      '<=',
      addMinutesToCurrentTime(
        SERVER_SETTINGS.REAPER.FREQUENCIES.DELETE_RATE_LIMITS
      ).getTime()
    )
    .get(); // get 100 random non-system rate limits
  const limits = db.parse(docs);

  console.info(`[REAP][LIMITS] found ${limits.length} expired limits`);

  // delete all of the limits that are expired
  const promises = limits.map((limit) => db.delete(limit.id));

  try {
    await Promise.all(promises);
    return promises.length;
  } catch (error) {
    console.error(`[REAP][LIMITS] failed to delete some limits`, error);
    return 0;
  }
};
