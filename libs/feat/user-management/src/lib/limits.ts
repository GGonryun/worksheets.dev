import { newUserLimitsDatabase } from '@worksheets/data-access/user-agent';
import { INITIAL_LIMITS } from './constants';
import { UserLimitsEntity } from '@worksheets/schemas-user';

const db = newUserLimitsDatabase();

// if the amount we're requesting exceeds our current key's limit we'll return false.
const exceedsLimit = async (opts: {
  uid: string;
  type: keyof Omit<UserLimitsEntity, 'id'>;
  value: number;
}) => {
  const limit = await getLimits(opts.uid);

  return Number(limit[opts.type]) < opts.value;
};

const getLimits = async (uid: string): Promise<UserLimitsEntity> => {
  let u: UserLimitsEntity;
  if (await db.has(uid)) {
    u = await db.get(uid);
  } else {
    u = await db.insert({
      ...INITIAL_LIMITS,
      id: uid,
    });
  }

  return u;
};

export const limits = {
  exceeds: exceedsLimit,
  get: getLimits,
};
