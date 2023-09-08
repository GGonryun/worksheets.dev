import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { getConnection } from './util';
import { ConnectionEntity } from '@worksheets/schemas-connections';

const applications = newApplicationsDatabase();
const connections = newConnectionsDatabase();

// method execution relies on this.
export const getFreshContext = async (opts: {
  userId: string;
  connectionId: string;
}): Promise<{
  context?: Record<string, unknown>;
  connection?: ConnectionEntity;
}> => {
  const connection = await getConnection(opts);
  if (!connection) {
    return {};
  }

  if (!applications.supportsConnections(connection.appId)) {
    return {};
  }

  // check if any oauth fields are stale and need refreshing before use.
  // if so, get their latest version and save them.
  const { refreshed, connection: refreshedConnection } =
    await applications.refreshConnection(connection);

  if (refreshed) {
    await connections.update(refreshedConnection);
  }

  const context = await applications.translateConnectionToContext(connection);

  return { context, connection };
};
