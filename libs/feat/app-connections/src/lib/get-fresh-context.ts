import { TRPCError } from '@trpc/server';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { getConnection } from './util';

const applications = newApplicationsDatabase();
const connections = newConnectionsDatabase();

// method execution relies on this.
export const getFreshContext = async (opts: {
  userId: string;
  appId: string;
}): Promise<Record<string, unknown>> => {
  if (!applications.supportsConnections(opts.appId)) {
    return {};
  }

  const connection = await getConnection(opts);
  if (!connection) {
    return {};
  }

  // check if we have an error if so terminate with an error.
  if (connection.error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: connection.error,
    });
  }

  if (connection.status !== 'active') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Connection is not active',
    });
  }

  // check if any oauth fields are stale and need refreshing before use.
  // if so, get their latest version and save them.
  const { refreshed, connection: refreshedConnection } =
    await applications.refreshConnection(connection);

  if (refreshed) {
    await connections.update(refreshedConnection);
  }

  const context = await applications.translateConnectionToContext(connection);

  return context;
};
