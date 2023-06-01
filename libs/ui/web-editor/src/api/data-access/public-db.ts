import { Txn } from '@worksheets/firebase/firestore';
import {
  WorksheetsDatabase,
  newExecutionsDatabase,
  newWorksheetsDatabase,
  ExecutionsDatabase,
  ExecutionEntity,
  newHandshakesDatabase,
  HandshakeDatabase,
  newSettingsDatabase,
  SettingsDatabase,
  SettingEntity,
} from './common';
import { HandlerFailure } from '@worksheets/util/next';
import { Execution } from '@worksheets/engine';
import { ApplicationLibrary, Clerk } from '@worksheets/apps/framework';
import { OfficialLibraryClerk, findOAuthProperty } from './clerk';

import { OAuthClient, OAuthToken } from '@worksheets/util/oauth/client';
import { isExpired } from '@worksheets/util/time';

export function newPublicDatabase(txn?: Txn) {
  const worksheetDb = newWorksheetsDatabase(txn);
  const executionsDb = newExecutionsDatabase(txn);
  const settingsDb = newSettingsDatabase(txn);
  const handshakesDb = newHandshakesDatabase(txn);
  const clerk = new OfficialLibraryClerk();

  return {
    applications: {
      treeView: getApplications(clerk),
    },
    handshakes: {
      get: getHandshake(handshakesDb),
      delete: deleteHandshake(handshakesDb),
    },
    worksheets: {
      get: getWorksheet(worksheetDb),
    },
    executions: {
      newExecution: newExecution(settingsDb, clerk),
      post: postExecutions(executionsDb),
      list: getExecutions(executionsDb),
      get: getExecution(executionsDb),
    },
    settings: {
      save: saveSetting(settingsDb),
      saveOAuth: saveOAuthSetting(settingsDb, handshakesDb, clerk),
    },
    oauth: {
      getLatestTokens: getLatestTokens(settingsDb, clerk),
    },
  };
}

const getApplications = (clerk: Clerk) => () => {
  return clerk.tree();
};

const saveOAuthSetting =
  (settings: SettingsDatabase, handshakes: HandshakeDatabase, clerk: Clerk) =>
  async (url?: string, handshakeId?: string) => {
    const closeRedirect = '/oauth/close';
    const errorRedirect = (message: string) => `/oauth/error?reason=${message}`;

    if (!url) {
      return { url: errorRedirect('INVALID_URL') };
    }

    if (!handshakeId) {
      return { url: errorRedirect('UNEXPECTED_STATE') };
    }

    const handshake = await handshakes.get(handshakeId);
    if (!handshake) {
      return { url: errorRedirect('HANDSHAKE_NOT_FOUND') };
    }

    const { methodPath, propertyKey, uid, timestamp } = handshake;
    if (isExpired(timestamp + 10 * 60 * 1000)) {
      return { url: errorRedirect('HANDSHAKE_EXPIRED') };
    }

    const method = clerk.borrow(methodPath);
    const prop = findOAuthProperty(method, propertyKey);

    try {
      const client = new OAuthClient(prop.options);
      const tokens = await client.parseUrl(url);

      const id = settings.id();
      await settings.updateOrInsert({
        id,
        uid: uid,
        type: 'oauth',
        method: methodPath,
        key: propertyKey,
        data: tokens,
      });

      await handshakes.delete(handshakeId);
      return { url: closeRedirect };
    } catch (error) {
      console.error(`failed to complete connection`, error);
    }
    return { url: errorRedirect('INTERNAL_SERVER_ERROR') };
  };

const saveSetting =
  (db: SettingsDatabase) => async (opt: Omit<SettingEntity, 'id'>) => {
    const id = db.id();
    await db.insert({
      ...opt,
      id,
    });
  };

const getLatestTokens =
  (db: SettingsDatabase, clerk: Clerk) =>
  async (setting: SettingEntity): Promise<OAuthToken> => {
    if (setting.type !== 'oauth') {
      throw new HandlerFailure({
        code: 'unsupported-operation',
        message: `invalid setting type, expected 'oauth' received '${setting.type}' `,
      });
    }

    if (!setting.data) {
      throw new HandlerFailure({
        code: 'unsupported-operation',
        message: `setting must have a token set`,
      });
    }

    const method = clerk.borrow(setting.method);

    const prop = findOAuthProperty(method, setting.key);

    const client = new OAuthClient(prop.options);

    const tokens = client.convertToOAuthToken(setting.data as string);
    if (tokens.expired()) {
      const { uid, method: met, key } = setting;
      console.info(`refreshing expired tokens on oauth setting`, uid, met, key);

      const refreshed = await tokens.refresh();
      // console.log('tokens refreshed', refreshed.data);

      setting.data = client.serializeToken(refreshed);
      await db.update({ ...setting });

      return refreshed;
    }

    return tokens;
  };

const getSettings =
  (db: SettingsDatabase, clerk: Clerk) =>
  async (uid: string, methodPath: string): Promise<Record<string, unknown>> => {
    if (!uid) {
      throw new HandlerFailure({
        code: 'unauthorized',
        message: 'cannot get settings without a user associated',
        data: {
          uid,
          methodPath,
          possibleReasons:
            'caused by an anonymous worksheet execution that tried to accesss a method that requires global account settings',
        },
      });
    }

    const settings = await db.query(
      { f: 'uid', o: '==', v: uid },
      { f: 'method', o: '==', v: methodPath }
    );

    console.info(
      `got ${settings.length} settings for method ${methodPath} for user ${uid}`
    );

    if (settings.length === 0) {
      return {};
    }

    const output: Record<string, unknown> = {};
    for (const setting of settings) {
      const data =
        setting.type !== 'oauth'
          ? setting.data
          : await getLatestTokens(db, clerk)(setting);

      output[setting.key] = data;
    }
    return output;
  };

const deleteHandshake = (db: HandshakeDatabase) => async (id: string) => {
  if (await db.has(id)) {
    await db.delete(id);
  }
  return true;
};

const getHandshake = (db: HandshakeDatabase) => async (id: string) => {
  if (await db.has(id)) {
    return await db.get(id);
  }

  throw new HandlerFailure({
    code: 'not-found',
  });
};

const newExecution =
  (db: SettingsDatabase, clerk: Clerk) =>
  // the uid will determine which settings to use
  async (uid: string): Promise<Execution> => {
    const getSettingsFn = getSettings(db, clerk);
    const library = new ApplicationLibrary({
      clerk,
      settingsLoader: (methodPath) => getSettingsFn(uid, methodPath),
    });
    const execution = new Execution({ library });
    return execution;
  };

const getExecution = (db: ExecutionsDatabase) => async (id: string) => {
  if (!(await db.has(id))) {
    throw new HandlerFailure({
      code: 'not-found',
    });
  }
  return await db.get(id);
};

const getExecutions = (db: ExecutionsDatabase) => async (id: string) => {
  const data = await db.collection
    .where('worksheetId', '==', id)
    .limit(20)
    .orderBy('timestamp', 'desc')
    .get();

  const entities = db.parse(data);

  return entities;
};

const postExecutions =
  (db: ExecutionsDatabase) => async (entity: ExecutionEntity) => {
    if (await db.has(entity.id)) {
      throw new HandlerFailure({
        code: 'conflict',
        message: `execution entity already exists`,
        data: entity,
      });
    }

    return await db.insert(entity);
  };

const getWorksheet = (db: WorksheetsDatabase) => async (id: string) => {
  if (!(await db.has(id))) {
    throw new HandlerFailure({
      code: 'not-found',
      message: `worksheet does not exist in the database`,
      data: { id },
    });
  }

  return await db.get(id);
};
