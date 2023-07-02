import { ApplicationDefinition, Settings } from '@worksheets/apps/framework';
import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';
import { newWorksheetsConnectionsDatabase } from '@worksheets/data-access/worksheets-connections';
import { ExecutionFailure } from '@worksheets/engine';
import { applyConnectionUpdates } from './apply-connection-updates';
import { getLatestTokens, mapSecureProperties } from './common';

const connectionsDb = newConnectionDatabase();
const worksheetsConnectionsDb = newWorksheetsConnectionsDatabase();

type DynamicSettingsResolverOptions = {
  userId: string;
  worksheetId?: string;
  overrideConnectionIds?: string[];
  app: ApplicationDefinition;
};

export const dynamicSettingsResolver = async (
  opts: DynamicSettingsResolverOptions
): Promise<ConnectionEntity | undefined> => {
  if (!opts.app.settings) {
    console.info(`[SETTINGS][${opts.app.id}] app doesn't have settings`);
    return undefined; // no settings to resolve.
  }
  const connection = await findConnection(opts);
  if (!connection) {
    console.info(`[SETTINGS][${opts.app.id}] connection does not exist`);
    return undefined; // no connection found.
  }

  console.info(
    `[SETTINGS][${opts.app.id}] found connection id ${connection.id} name ${connection.name}`
  );

  // TODO: decrypt all connection properties.
  return await refreshOAuthTokens(connection, opts.app.settings);
};

const findConnection = async ({
  userId,
  worksheetId,
  overrideConnectionIds,
  app,
}: DynamicSettingsResolverOptions) => {
  if (overrideConnectionIds?.length) {
    // check this user's app connections and check if any of the overrides exists if so that's the connection to use.
    const connections = await connectionsDb.query(
      { f: 'appId', o: '==', v: app.id },
      { f: 'uid', o: '==', v: userId }
    );

    const possibleConnections = connections.filter((c) =>
      overrideConnectionIds.includes(c.id)
    );

    if (possibleConnections.length > 1) {
      throw new ExecutionFailure({
        code: 'invalid-precondition',
        message: `Multiple connections were provided for this app. Select only one.`,
      });
    } else if (possibleConnections.length === 0) {
      throw new ExecutionFailure({
        code: 'invalid-precondition',
        message: `No connections were provided for this app. Add a connection.`,
      });
    }

    const connection = possibleConnections[0];
    if (connection.uid != userId) {
      console.error(
        `[SETTINGS] user ${userId} tried to use connection ${connection.id} owned by ${connection.uid}`
      );

      throw new ExecutionFailure({
        code: 'invalid-precondition',
        message: `Invalid connection was provided. Select a valid connection.`,
      });
    }
    return connection;
  }

  if (worksheetId) {
    // find the worksheet's connection for this app.
    const setting = await worksheetsConnectionsDb.findOne(
      { f: 'worksheetId', o: '==', v: worksheetId },
      { f: 'appId', o: '==', v: app.id }
    );
    try {
      return await connectionsDb.get(setting.connectionId);
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-precondition',
        message: `Selected connection does not exist. Add a new one.`,
      });
    }
  }

  return undefined;
};

export const refreshOAuthTokens = async (
  connection: ConnectionEntity,
  fields: Settings
): Promise<ConnectionEntity> => {
  if (!fields) return connection;

  // TODO: callback hell.
  const newProps = await mapSecureProperties(
    connection.settings,
    fields,
    async (value, key, setting) => {
      if (setting.type !== 'oauth') return value;
      return await getLatestTokens(value, setting, async (serialized) => {
        console.log(
          `[OAUTH] updating user ${connection.uid} app ${connection.appId} connection ${connection.id}`
        );

        await applyConnectionUpdates(connection.id, {
          settings: { ...connection.settings, [key]: serialized },
        });
      });
    }
  );

  connection.settings = newProps;

  return connection;
};
