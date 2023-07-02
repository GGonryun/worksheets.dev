import { newServerRateLimitDatabase } from '@worksheets/data-access/server-limits';
import { addMinutesToCurrentTime, isExpired } from '@worksheets/util/time';

// in minutes
const REAPER_DEADLINE = 5;
const REAPER_CONCURRENT_DELETES = 100;

const db = newServerRateLimitDatabase();

export const reapRateLimits = async (
  quantity: number = REAPER_CONCURRENT_DELETES
) => {
  console.info(
    `[REAP][LIMITS][REQ] searching for at most ${quantity} expired limits`
  );

  const docs = await db.collection
    .limit(quantity)
    .where('replenish', '<=', Date.now())
    .get(); // get 100 random non-system rate limits
  const limits = db.parse(docs);
  console.log(`[REAP][LIMITS] found ${limits.length} limits`);

  const deletable = limits.filter((limit) =>
    isExpired(
      limit.replenish,
      addMinutesToCurrentTime(-1 * REAPER_DEADLINE).getTime()
    )
  );
  console.info(`[REAP][LIMITS] found ${deletable.length} expired limits`);

  // delete all of the limits that are expired
  const promises = deletable.map((limit) => db.delete(limit.id));

  try {
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error(`[REAP][LIMITS] failed to delete some limits`, error);
    return false;
  }
};
