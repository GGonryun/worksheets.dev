import { Txn } from '@worksheets/firebase/firestore';
import { HandlerFailure } from '@worksheets/util/next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  ExecutionsDatabase,
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
    executions: {
      delete: deleteExecution(executionsDb, worksheetsDb, user),
      clear: clearExecution(executionsDb, worksheetsDb, user),
    },
  };
}
export function clearExecution(
  executeDb: ExecutionsDatabase,
  worksheetsDb: WorksheetsDatabase,
  user: DecodedIdToken
) {
  return async (worksheetId: string) => {
    // check user access to worksheet if it exists
    if (await worksheetsDb.has(worksheetId)) {
      await userWorksheet(worksheetsDb, user)(worksheetId);
    }

    // get executions and delete them.
    const executions = await executeDb.query({
      f: 'worksheetId',
      o: '==',
      v: worksheetId,
    });

    // delete all executions if owner.
    const promises: Promise<unknown>[] = [];
    for (const exe of executions) {
      promises.push(executeDb.delete(exe.id));
    }
    await Promise.all(promises);

    console.info(`deleted ${executions.length} executions`);
    return true;
  };
}

export function deleteExecution(
  executeDb: ExecutionsDatabase,
  worksheetsDb: WorksheetsDatabase,
  user: DecodedIdToken
) {
  return async (executionId: string) => {
    if (!(await executeDb.has(executionId))) {
      throw new HandlerFailure({
        code: 'not-found',
      });
    }

    const execution = await executeDb.get(executionId);

    // check user access to worksheet.
    await userWorksheet(worksheetsDb, user)(execution.worksheetId);

    // delete execution if owner.
    await executeDb.delete(executionId);

    return true;
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
