import { ApplicationLibrary, Clerk } from '@worksheets/apps/framework';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newHandshakesDatabase } from '@worksheets/data-access/handshakes';
import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';
import { HandlerFailure } from '@worksheets/util/next';
import { OAuthClient } from '@worksheets/util/oauth/client';
import { closeRedirect, errorRedirect } from './util';
import { isExpired } from '@worksheets/util/time';
import { TRPCError } from '@trpc/server';
import { RequiredBy } from '@worksheets/util/types';
import { z } from 'zod';

const connectionsDb = newConnectionDatabase();
const registry = newApplicationsDatabase();
const handshakesDb = newHandshakesDatabase();

export const newPrivateLibrary = (userId: string) => {
  const library = new ApplicationLibrary({
    clerk: registry,
    settingsLoader: (methodPath) => {
      console.info('TODO', userId, methodPath);
      return Promise.resolve({});
    },
  });
  return library;
};

export const newEmptyLibrary = () => {
  return new ApplicationLibrary({
    clerk: new Clerk(),
    settingsLoader: () => Promise.resolve({}),
  });
};

// const getLatestTokens = async (setting: SettingEntity): Promise<OAuthToken> => {
//   if (setting.type !== 'oauth') {
//     throw new HandlerFailure({
//       code: 'unsupported-operation',
//       message: `invalid setting type, expected 'oauth' received '${setting.type}' `,
//     });
//   }

//   if (!setting.data) {
//     throw new HandlerFailure({
//       code: 'unsupported-operation',
//       message: `setting must have a token set`,
//     });
//   }

//   const method = applicationsDb.borrow(setting.method);

//   const prop = findOAuthProperty(method, setting.key);

//   const client = new OAuthClient(prop.options);

//   const tokens = client.convertToOAuthToken(setting.data as string);

//   if (tokens.expired() && tokens.refreshToken) {
//     const refreshed = await tokens.refresh();

//     setting.data = client.serializeToken(refreshed);

//     await settingsDb.update({ ...setting });

//     return refreshed;
//   }

//   return tokens;
// };

export const connectionFormSchema = z.object({
  id: z.string().describe('the connection id'),
  name: z.string().optional(),
  appId: z.string(),
  settings: z.record(z.unknown()).optional(),
});

export type ConnectionForm = z.infer<typeof connectionFormSchema>;

export const loadConnectionForm = async ({
  id,
}: {
  id: string;
  uid: string;
}): Promise<ConnectionForm> => {
  // return empty form if connection doesn't exist
  if (!id || !(await connectionsDb.has(id))) {
    return {
      id: '',
      name: '',
      appId: '',
      settings: {},
    };
  }
  const connection = await connectionsDb.get(id);
  const app = registry.getApp(connection.appId);
  // get settings
  const settings = app.settings;
  // for each connection setting, replace oauth tokens if they are set.
  if (settings && connection.settings) {
    connection.settings = Object.keys(connection.settings).reduce(
      (acc, key) => {
        const value = connection.settings[key];
        const setting = settings[key];
        if (setting.type === 'oauth') {
          acc[key] = Boolean(value);
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  return {
    id: connection.id,
    name: connection.name,
    appId: connection.appId,
    settings: connection.settings,
  };
};

export const listConnections = async ({ uid }: { uid: string }) => {
  const connections = await connectionsDb.query({ f: 'uid', o: '==', v: uid });
  return connections;
};

export const deleteConnectionField = async ({
  connectionId,
  settingId,
}: {
  settingId: string;
  connectionId: string;
}) => {
  const connection = await connectionsDb.get(connectionId);

  if (!connection) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `invalid connection id '${connectionId}'`,
    });
  }

  // find the setting on the connection.
  console.log('deleting setting', settingId);
  connection.settings[settingId] = '';

  await applyConnectionUpdates(connectionId, {
    settings: connection.settings,
  });

  return connection;
};
export const deleteConnection = async ({
  id,
  uid,
}: {
  id: string;
  uid: string;
}) => {
  const connection = await connectionsDb.get(id);
  //check if user has access
  if (connection.uid !== uid) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `user does not have access to this connection`,
    });
  }
  await connectionsDb.delete(id);
  return true;
};
export const resolveHandshake = async (
  url?: string,
  handshakeId?: string
): Promise<{ url: string }> => {
  if (!url) {
    return errorRedirect('INVALID_URL');
  }

  if (!handshakeId) {
    return errorRedirect('INVALID_HANDSHAKE_ID');
  }

  const handshake = await getHandshake(handshakeId);
  if (!handshake) {
    return errorRedirect('INVALID_HANDSHAKE');
  }

  const { appId, uid, timestamp, settingId, connectionId } = handshake;
  if (isExpired(timestamp + 10 * 60 * 1000)) {
    return errorRedirect('EXPIRED_HANDSHAKE');
  }

  const app = registry.getApp(appId);
  const setting = app?.settings?.[settingId];

  if (!setting) {
    return errorRedirect('INVALID_SETTING');
  }

  if (setting.type !== 'oauth') {
    return errorRedirect('INVALID_SETTING_TYPE');
  }

  try {
    const client = new OAuthClient(setting.options);
    const tokens = await client.parseUrl(url);

    await applyConnectionUpdates(connectionId, {
      uid: uid,
      appId: appId,
      settings: { [settingId]: tokens },
    });

    await deleteHandshake(handshakeId);
    return closeRedirect();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`more details`, error.message);
    }
    console.error(`failed to complete oauth connection`, error);
    return errorRedirect('UNKNOWN_FAILURE');
  }
};

export const createOAuthUrl = async (opts: ConnectionFieldOptions) => {
  const { appId, settingId } = opts;

  const app = registry.getApp(appId);

  const settings = app.settings;
  if (!settings) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `cannot create oauth url for app ${appId} because it does not have any settings`,
    });
  }

  const setting = settings[settingId];
  if (setting.type !== 'oauth') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'setting is not of type oauth',
    });
  }

  const client = new OAuthClient(setting.options);

  const handshakeId = await createHandshake(opts);

  const url = client.getUri(handshakeId);

  return { url };
};

export const submitConnectionForm = async (
  entity: RequiredBy<ConnectionEntity, 'id' | 'appId'>
) => {
  const settings = entity.settings;
  if (settings) {
    // get the app from the registry
    const app = registry.getApp(entity.appId);

    // get the settings from the app
    const fields = app.settings;
    if (!fields) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `cannot save connection form for app ${entity.appId} because it does not have any settings`,
      });
    }

    // remove any oauth settings from the entity
    const obj = Object.keys(settings)
      .filter((key) => fields[key]?.type !== 'oauth')
      .reduce((acc, key) => {
        acc[key] = settings[key];
        return acc;
      }, {} as Record<string, unknown>);

    entity.settings = obj;
  }

  await applyConnectionUpdates(entity.id, entity);
};

const applyConnectionUpdates = async (
  connectionId: string,
  { uid, appId, settings, name }: Partial<Omit<ConnectionEntity, 'id'>>
) => {
  await connectionsDb.apply(connectionId, {
    uid,
    appId,
    name,
    settings,
    updatedAt: Date.now(),
  });
};

type ConnectionFieldOptions = {
  userId: string;
  connectionId: string;
  appId: string;
  settingId: string;
};

const createHandshake = async ({
  userId,
  connectionId,
  appId,
  settingId,
}: ConnectionFieldOptions) => {
  const handshakeId = handshakesDb.id();

  await handshakesDb.insert({
    uid: userId,
    id: handshakeId,
    timestamp: Date.now(),
    connectionId,
    appId,
    settingId,
  });

  return handshakeId;
};

const getHandshake = async (id: string) => {
  if (await handshakesDb.has(id)) {
    return await handshakesDb.get(id);
  }

  throw new HandlerFailure({
    code: 'not-found',
  });
};

const deleteHandshake = async (id: string) => {
  if (await handshakesDb.has(id)) {
    await handshakesDb.delete(id);
  }
  return true;
};
