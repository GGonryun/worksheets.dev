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

// should replenish every hour.
const INITIAL_QUOTAS = {
  maxApiTokenUses: 100,
  maxExecutions: 10,
  maxProcessing: durationToMilliseconds({ minutes: 5 }),
};

export const quotas = {
  exceeds: async (
    uid: string,
    { key, value }: { key: keyof Omit<UserQuotasEntity, 'id'>; value: number }
  ) => {
    const quota = await getQuotas(uid);
    return quota[key] < value;
  },
  meets: async (
    uid: string,
    { key, value }: { key: keyof Omit<UserQuotasEntity, 'id'>; value: number }
  ) => {
    const quota = await getQuotas(uid);
    return quota[key] < value;
  },
};
