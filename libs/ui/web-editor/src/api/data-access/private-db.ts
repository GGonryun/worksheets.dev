import { Txn } from '@worksheets/firebase/firestore';
import { HandlerFailure } from '@worksheets/util/next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  ExecutionsDatabase,
  newExecutionsDatabase,
  newWorksheetsDatabase,
  WorksheetsDatabase,
  WorksheetEntity,
  newSettingsDatabase,
  newHandshakesDatabase,
  SettingsDatabase,
  HandshakeDatabase,
} from './common';
import { OfficialLibraryClerk, findProperty } from './clerk';
import { Clerk } from '@worksheets/apps/framework';
import { OAuthClient } from '@worksheets/util/oauth/client';

export function newPrivateDatabase(user: DecodedIdToken, txn?: Txn) {
  const worksheetsDb = newWorksheetsDatabase(txn);
  const executionsDb = newExecutionsDatabase(txn);
  const settingsDb = newSettingsDatabase(txn);
  const handshakeDb = newHandshakesDatabase(txn);
  const clerk = new OfficialLibraryClerk();

  return {
    worksheets: {
      list: userWorksheets(worksheetsDb, user),
      get: userWorksheet(worksheetsDb, user),
      upsert: upsertWorksheet(worksheetsDb, user),
      has: hasWorksheet(worksheetsDb, user),
      delete: deleteWorksheet(worksheetsDb, user),
    },
    executions: {
      delete: deleteExecution(executionsDb, worksheetsDb, user),
      clear: clearExecution(executionsDb, worksheetsDb, user),
    },
    settings: {
      save: updateSetting(clerk, settingsDb, handshakeDb, user),
    },
  };
}

export function updateSetting(
  clerk: Clerk,
  settingsDb: SettingsDatabase,
  handshakesDb: HandshakeDatabase,
  user: DecodedIdToken
) {
  return async (
    methodPath: string,
    propertyKey: string,
    data?: unknown
  ): Promise<{ url?: string }> => {
    const method = clerk.borrow(methodPath);
    const prop = findProperty(method, propertyKey);
    if (prop.type === 'flag' || prop.type === 'token') {
      const entityId = await findSettingEntityId(
        settingsDb,
        methodPath,
        propertyKey,
        user.uid
      );

      await settingsDb.updateOrInsert({
        id: entityId ?? settingsDb.id(),
        uid: user.uid,
        type: prop.type,
        method: methodPath,
        key: propertyKey,
        data: data,
      });

      return {};
    }

    if (prop.type === 'oauth') {
      const client = new OAuthClient(prop.options);
      const handshakeId = handshakesDb.id();

      await handshakesDb.insert({
        uid: user.uid,
        id: handshakeId,
        timestamp: Date.now(),
        methodPath,
        propertyKey,
      });

      return { url: client.getUri(handshakeId) };
    }

    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `cannot save property type`,
      data: prop,
    });
  };
}

async function findSettingEntityId(
  db: SettingsDatabase,
  methodPath: string,
  propertyKey: string,
  userId: string
): Promise<string | undefined> {
  const settings = await db.query(
    { f: 'uid', o: '==', v: userId },
    { f: 'method', o: '==', v: methodPath },
    { f: 'key', o: '==', v: propertyKey }
  );
  if (!settings || settings.length < 1) {
    return undefined;
  }
  if (settings.length > 1) {
    console.warn(
      `unexpected: found more than 1 settings with the same method, uid, and key`,
      settings.map((s) => s.id)
    );
  }
  return settings[0].id;
}

export function deleteWorksheet(
  worksheetsDb: WorksheetsDatabase,
  user: DecodedIdToken
) {
  return async (worksheetId: string) => {
    // check user access
    const worksheet = await userWorksheet(worksheetsDb, user)(worksheetId);
    await worksheetsDb.delete(worksheet.id);
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
    const map: Record<string, WorksheetEntity> = {};
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

    return { id, text: entity.text };
  };
}

export function upsertWorksheet(db: WorksheetsDatabase, user: DecodedIdToken) {
  return async (entity: Omit<WorksheetEntity, 'uid'>) =>
    await db.updateOrInsert({
      ...entity,
      uid: user.uid,
    });
}
