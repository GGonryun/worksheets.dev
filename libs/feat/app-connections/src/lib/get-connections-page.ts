import {
  ConnectionStatuses,
  GetConnectionsPageResponse,
} from '@worksheets/schemas-connections';
import { getApplicationDetails } from './util';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const db = newConnectionsDatabase();

export const getConnectionsPage = async (
  userId: string
): Promise<GetConnectionsPageResponse> => {
  // populate their metadata.
  const details = getApplicationDetails();
  // get the connection status for each app.
  const connectedApps: Record<string, ConnectionStatuses> =
    await getConnectionStatuses(userId);

  // update the status of each app based on the connection status.
  for (const detail of details) {
    const status = connectedApps[detail.appId];
    if (connectedApps[detail.appId]) {
      detail.status = status;
    } else {
      detail.status = 'uninstalled';
    }
  }

  // return the list of apps.
  return details;
};

const getConnectionStatuses = async (
  userId: string
): Promise<Record<string, ConnectionStatuses>> => {
  // get all the currently set connections for the user.
  const connections = await db.query({ f: 'userId', o: '==', v: userId });
  // map the connections to a record of appId to status.
  const statuses: Record<string, ConnectionStatuses> = {};
  for (const connection of connections) {
    statuses[connection.appId] = connection.status;
  }
  return statuses;
};
