import {
  UserFlagsEntity,
  flagsSchema,
  newUserFlagsDatabase,
} from '@worksheets/data-access/user-agent';
import { TypeOf } from 'zod';
import { INITIAL_FLAGS } from './constants';

const db = newUserFlagsDatabase();

const getFlags = async (uid: string): Promise<UserFlagsEntity> => {
  let f: UserFlagsEntity;
  if (await db.has(uid)) {
    f = await db.get(uid);
  } else {
    f = await db.insert({
      id: uid,
      flags: [...INITIAL_FLAGS],
    });
  }
  return f;
};

export const flags = {
  get: getFlags,
  check: async (
    uid: string,
    key: TypeOf<typeof flagsSchema>,
    defaultTo?: boolean
  ) => {
    const { flags } = await getFlags(uid);
    if (flags) {
      return flags.includes(key);
    }
    return defaultTo ?? false;
  },
  set: async (uid: string, key: TypeOf<typeof flagsSchema>) => {
    const { flags } = await getFlags(uid);
    await db.update({
      id: uid,
      flags: [...flags, key],
    });
  },
};
