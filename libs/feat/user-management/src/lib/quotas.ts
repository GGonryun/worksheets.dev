import {
  UserQuotasEntity,
  newUserQuotasDatabase,
} from '@worksheets/data-access/user-agent';
import { INITIAL_QUOTAS } from './constants';

const db = newUserQuotasDatabase();

const getQuotas = async (uid: string): Promise<UserQuotasEntity> => {
  return await db.get(uid);
};

const createQuotas = async (uid: string): Promise<UserQuotasEntity> => {
  return await db.insert({
    ...INITIAL_QUOTAS,
    createdAt: Date.now(),
    id: uid,
  });
};

export const quotas = {
  exist: async (uid: string) => {
    return await db.has(uid);
  },
  update: async (
    uid: string,
    opts: { enabled?: boolean; overclock?: boolean }
  ) => {
    const userQuotas = await getQuotas(uid);
    if (opts.overclock != null) {
      userQuotas.overclocked = opts.overclock;
    }

    if (opts.enabled != null) {
      userQuotas.enabled = opts.enabled;
    }

    await db.update(userQuotas);
    return true;
  },
  get: getQuotas,
  create: createQuotas,
  request: async (opts: {
    uid: string;
    type: keyof Omit<
      UserQuotasEntity,
      'id' | 'createdAt' | 'enabled' | 'overclocked'
    >;
    quantity: number;
  }) => {
    const userQuotas = await getQuotas(opts.uid);

    if (!userQuotas.enabled) {
      console.warn(`[QUOTAS][${opts.uid}] disabled for user`);
      return false;
    }

    const userQuota = userQuotas[opts.type];
    if (userQuota.current <= 0) {
      console.warn(`[QUOTAS][${opts.uid}] quota ${opts.type} exhausted`);
      return false;
    }

    userQuota.current -= opts.quantity;
    await db.update(userQuotas);
    return true;
  },

  isEmpty: async (opts: {
    uid: string;
    type: keyof Omit<
      UserQuotasEntity,
      'id' | 'createdAt' | 'enabled' | 'overclocked'
    >;
  }) => {
    const userQuotas = await getQuotas(opts.uid);

    if (!userQuotas.enabled) {
      console.warn(`[QUOTAS][${opts.uid}] disabled for user`);
      return false;
    }

    const userQuota = userQuotas[opts.type];

    return userQuota.current <= 0;
  },
};
