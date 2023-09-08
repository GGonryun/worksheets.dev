import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { UserConnection } from '@worksheets/schemas-connections';
import { formatTimestamp } from '@worksheets/util/time';

const db = newApplicationsDatabase();
const connectionsDb = newConnectionsDatabase();

type ListUserConnectionsOpts = {
  userId: string;
  appId?: string;
};
export const listUserConnections = async (
  opts: ListUserConnectionsOpts
): Promise<UserConnection[]> => {
  let connections;
  if (!opts.appId) {
    connections = await connectionsDb.query({
      f: 'userId',
      o: '==',
      v: opts.userId,
    });
  } else {
    connections = await connectionsDb.query(
      { f: 'appId', o: '==', v: opts.appId },
      { f: 'userId', o: '==', v: opts.userId }
    );
  }

  const userConnections: UserConnection[] = connections.map((c) => ({
    id: c.id,
    name: c.name,
    createdAt: formatTimestamp(c.createdAt),
    app: db.get(c.appId),
    status: c.enabled ? 'active' : 'disabled', // TODO: set status after validation.
  }));

  return userConnections;
};
