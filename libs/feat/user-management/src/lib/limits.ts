import {
  UserLimitsEntity,
  newUserLimitsDatabase,
} from '@worksheets/data-access/user-agent';
import { INITIAL_LIMITS } from './constants';

const db = newUserLimitsDatabase();

const exceedsLimit = async (
  uid: string,
  key: keyof Omit<UserLimitsEntity, 'id'>,
  value: number
) => {
  const limit = await getLimits(uid);
  return Number(limit[key]) < value;
};

const meetsLimit = async (
  uid: string,
  { key, value }: { key: keyof Omit<UserLimitsEntity, 'id'>; value: number }
) => {
  const limit = await getLimits(uid);
  return limit[key] < value;
};

const getLimits = async (uid: string): Promise<UserLimitsEntity> => {
  let u: UserLimitsEntity;
  if (await db.has(uid)) {
    u = await db.get(uid);
  } else {
    u = await db.insert({ ...INITIAL_LIMITS, id: uid });
  }

  return u;
};

export const limits = {
  exceeds: exceedsLimit,
  meets: meetsLimit,
  get: getLimits,
};
