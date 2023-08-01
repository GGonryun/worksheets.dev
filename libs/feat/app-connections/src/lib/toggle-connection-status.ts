import { TRPCError } from '@trpc/server';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { getConnection } from './util';
import { ConnectionStatuses } from '@worksheets/schemas-connections';

const applications = newApplicationsDatabase();
const connections = newConnectionsDatabase();

const isConnected: Record<ConnectionStatuses, boolean> = {
  error: true,
  active: true,
  disabled: true,
  warning: true,
  unknown: false,
  uninstalled: false,
};

export const toggleConnectionStatus = async (opts: {
  appId: string;
  userId: string;
}) => {
  // 1. get the connection
  const connection = await getConnection({
    appId: opts.appId,
    userId: opts.userId,
  });

  // 2. cannot update a connection that does not exist.
  if (!connection) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Application ${opts.appId} not found.`,
    });
  }

  if (!isConnected[connection.status]) {
    throw new TRPCError({
      code: 'METHOD_NOT_SUPPORTED',
      message: `Application ${opts.appId} is not connected for user ${opts.userId}.`,
    });
  }
  // 3. if we are currently enabled, toggle to disabled and set the new state.
  if (connection.status !== 'disabled') {
    return await connections.apply(connection.id, {
      status: 'disabled',
    });
  }

  // 4. otherwise if we're enabling again we need to calculate the new status.
  const { connection: refreshedConnection } =
    await applications.refreshConnection(connection);

  const validation = await applications.validateConnection(
    refreshedConnection.appId,
    refreshedConnection.fields
  );

  console.log('validation', validation);

  // 5. regardless of wether a refresh happened or not copy the data across.
  // there may be race conditions here if another connection refresh attempt starts before ours.
  return await connections.update({ ...refreshedConnection, ...validation });
};
