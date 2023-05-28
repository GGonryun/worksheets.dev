import { Txn } from '@worksheets/firebase/firestore';
import { HandlerFailure } from '@worksheets/util/next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  newExecutionsDatabase,
  newWorksheetsDatabase,
  WorksheetsDatabase,
  WorksheetsEntity,
} from './common';

export function newPrivateDatabase(user: DecodedIdToken, txn?: Txn) {
  const worksheetsDb = newWorksheetsDatabase(txn);
  const executionsDb = newExecutionsDatabase(txn);

  return {
    worksheets: {
      list: userWorksheets(worksheetsDb, user),
      get: userWorksheet(worksheetsDb, user),
      create: createWorksheet(worksheetsDb, user),
      has: hasWorksheet(worksheetsDb, user),
    },
  };
}

export function hasWorksheet(db: WorksheetsDatabase, user: DecodedIdToken) {
  return async (id: string) => {
    const exists = await db.has(id);
    if (!exists) {
      return false;
    }

    const file = await db.get(id);
    if (file.uid !== user.uid) {
      throw new HandlerFailure({ code: 'unauthorized' });
    }

    return true;
  };
}

export function userWorksheets(db: WorksheetsDatabase, user: DecodedIdToken) {
  return async () => {
    const list = await db.query({ f: 'uid', o: '==', v: user.uid });
    const map: Record<string, WorksheetsEntity> = {};
    for (const entity of list) {
      map[entity.id] = entity;
    }
    return map;
  };
}

export function userWorksheet(db: WorksheetsDatabase, user: DecodedIdToken) {
  return async (id: string) => {
    const entity = await db.get(id);
    if (entity.uid !== user.uid) {
      throw new HandlerFailure({ code: 'unauthorized' });
    }

    return { text: entity.text };
  };
}

export function createWorksheet(db: WorksheetsDatabase, user: DecodedIdToken) {
  return async (entity: Omit<WorksheetsEntity, 'uid'>) =>
    await db.updateOrInsert({
      ...entity,
      uid: user.uid,
    });
}
