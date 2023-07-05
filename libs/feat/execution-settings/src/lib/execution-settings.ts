import { ApplicationLibrary, Clerk } from '@worksheets/apps/framework';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newHandshakesDatabase } from '@worksheets/data-access/handshakes';
import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';
import { OAuthClient } from '@worksheets/util/oauth/client';
import { closeRedirect, errorRedirect } from './util';
import { isExpired } from '@worksheets/util/time';
import { TRPCError } from '@trpc/server';
import { RequiredBy } from '@worksheets/util/types';
import { z } from 'zod';
import { newWorksheetsConnectionsDatabase } from '@worksheets/data-access/worksheets-connections';
import { limits as serverLimits } from '@worksheets/feat/server-management';
import { quotas as userQuotas } from '@worksheets/feat/user-management';
import { ExecutionFailure } from '@worksheets/engine';
import { mapSecureProperties } from './common';
import { dynamicSettingsResolver } from './dynamic-settings-resolver';
import { applyConnectionUpdates } from './apply-connection-updates';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const connectionsDb = newConnectionDatabase();
const worksheetsConnectionsDb = newWorksheetsConnectionsDatabase();
const registry = newApplicationsDatabase();
const handshakesDb = newHandshakesDatabase();

type PrivateLibraryOptions = {
  userId: string;
  worksheetId?: string;
  // a list of known connections.
  connectionIds?: string[];
};
export const newPrivateLibrary = ({
  userId,
  worksheetId,
  connectionIds,
}: PrivateLibraryOptions) => {
  const library = new ApplicationLibrary({
    clerk: registry,
    settingsLoader: async ({ path, app }) => {
      console.info(
        `[APPLOADER][${path}][private] searching for user ${userId} settings`
      );
      const connection = await dynamicSettingsResolver({
        userId,
        worksheetId,
        overrideConnectionIds: connectionIds,
        app,
      });
      return connection?.settings ?? {};
    },
    beforeMethodCall: async (opts) => {
      if (
        !(await serverLimits.throttle({
          id: SERVER_SETTINGS.LIMIT_IDS.SPECIFIC_APPLICATION_METHOD_CALL(
            opts.app.id,
            opts.method.id
          ),
          meta: SERVER_SETTINGS.META_IDS.APPLICATION_METHODS,
          quantity:
            SERVER_SETTINGS.RESOURCE_CONSUMPTION
              .SPECIFIC_APPLICATION_METHOD_CALL,
        }))
      ) {
        throw new ExecutionFailure({
          code: 'internal-error',
          message: SERVER_SETTINGS.SYSTEM_ERRORS.TOO_MANY_SPECIFIC_METHOD_CALLS(
            opts.app.id,
            opts.method.id
          ),
        });
      }

      if (
        !(await serverLimits.throttle({
          id: SERVER_SETTINGS.LIMIT_IDS.SYSTEM_APPLICATION_METHOD_CALL,
          meta: SERVER_SETTINGS.META_IDS.SYSTEM,
          quantity:
            SERVER_SETTINGS.RESOURCE_CONSUMPTION.SYSTEM_APPLICATION_METHOD_CALL,
        }))
      ) {
        throw new ExecutionFailure({
          code: 'internal-error',
          message:
            'Server does not have sufficient processing capability to handle this request.',
        });
      }

      if (
        opts.app.meta.external &&
        !(await userQuotas.request({
          type: `methodCalls`,
          quantity: SERVER_SETTINGS.RESOURCE_CONSUMPTION.USER_METHOD_CALL,
          uid: userId,
        }))
      ) {
        console.error('User ran out of method call processing capability.', {
          userId: userId,
          path: opts.path,
        });
        // prevent user from making too many requests.
        throw new ExecutionFailure({
          code: 'insufficient-quota',
          message: SERVER_SETTINGS.USER_ERRORS.TOO_MANY_METHOD_CALLS,
        });
      }

      console.info(
        `[APPLOADER][${opts.path}][private] user ${userId} passed pre-method throttle checks`
      );
    },
  });
  return library;
};

export const newEmptyLibrary = () =>
  new ApplicationLibrary({
    clerk: new Clerk(),
    settingsLoader: async () => Promise.resolve({}),
    beforeMethodCall: async () => {
      // do nothing
    },
  });

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
}): Promise<{ created: boolean; connection: ConnectionForm }> => {
  console.info(`[CONNECTIONS] loading connection form for ${id}`);
  // return empty form if connection doesn't exist
  if (!id || !(await connectionsDb.has(id))) {
    return {
      created: true,
      connection: {
        id: '',
        name: '',
        appId: '',
        settings: {},
      },
    };
  }
  const connection = await connectionsDb.get(id);
  const app = registry.getApp(connection.appId);
  // get settings
  const appSettings = app.settings;
  // for each connection setting, replace oauth tokens if they are set.
  if (appSettings && connection.settings) {
    // TODO: encryption audit, we will need to mask our non-oauth tokens here too.
    connection.settings = await mapSecureProperties(
      connection.settings,
      appSettings,
      async (v, k, s) => {
        console.info(`[CONNECTIONS] mapping secure property ${k}`);
        if (s.type === 'oauth') {
          return Boolean(v);
        } else {
          return v;
        }
      }
    );
  }

  return {
    created: false,
    connection: {
      id: connection.id,
      name: connection.name,
      appId: connection.appId,
      settings: connection.settings,
    },
  };
};

// TODO: encryption audit? does this method need it?
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
  // also delete related worksheet connections
  const connections = await worksheetsConnectionsDb.query({
    f: 'connectionId',
    o: '==',
    v: id,
  });
  console.info('deleting related worksheet connections', connections.length);
  connections.forEach(async (c) => await worksheetsConnectionsDb.delete(c.id));

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
  if (isExpired(timestamp + SERVER_SETTINGS.HANDSHAKE_EXPIRATION_OFFSET)) {
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

  throw new TRPCError({
    code: 'NOT_FOUND',
  });
};

const deleteHandshake = async (id: string) => {
  if (await handshakesDb.has(id)) {
    await handshakesDb.delete(id);
  }
  return true;
};
