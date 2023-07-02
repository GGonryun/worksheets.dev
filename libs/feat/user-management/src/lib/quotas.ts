import {
  UserQuotasEntity,
  newUserQuotasDatabase,
} from '@worksheets/data-access/user-agent';
import { durationToMilliseconds } from '@worksheets/util/time';

const db = newUserQuotasDatabase();

const getQuotas = async (uid: string): Promise<UserQuotasEntity> => {
  let q: UserQuotasEntity;
  if (await db.has(uid)) {
    q = await db.get(uid);
  } else {
    q = await db.insert({
      ...INITIAL_QUOTAS,
      id: uid,
    });
  }
  return q;
};

// should replenish out of band every hour.
const INITIAL_QUOTAS = {
  tokenUses: 1000,
  executions: 100,
  methodCalls: 500,
  processingTime: durationToMilliseconds({ minutes: 5 }),
};

export const quotas = {
  request: async (opts: {
    uid: string;
    type: keyof Omit<UserQuotasEntity, 'id'>;
    quantity: number;
  }) => {
    const quota = await getQuotas(opts.uid);
    if (quota[opts.type] < opts.quantity) {
      return false;
    }

    quota[opts.type] -= opts.quantity;
    await db.update(quota);
    return true;
  },
  isEmpty: async (opts: {
    uid: string;
    type: keyof Omit<UserQuotasEntity, 'id'>;
  }) => {
    const quota = await getQuotas(opts.uid);
    return quota[opts.type] <= 0;
  },
};
