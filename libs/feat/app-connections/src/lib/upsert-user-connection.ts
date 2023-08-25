import { TRPCError } from '@trpc/server';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const applications = newApplicationsDatabase();
const connections = newConnectionsDatabase();

export const upsertUserConnection = async (opts: {
  appId: string;
  userId: string;
  connectionId?: string;
  data: Record<string, string>;
}) => {
  try {
    let connectionId = opts.connectionId;

    if (connectionId) {
      await connections.apply(connectionId, {
        fields: opts.data,
        updatedAt: Date.now(),
      });
    } else {
      const app = applications.get(opts.appId);

      connectionId = connections.id();

      await connections.insert({
        id: connectionId,
        appId: opts.appId,
        userId: opts.userId,
        fields: opts.data,
        name: `New ${app.name} Connection`,
        enabled: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return connectionId;
  } catch (error) {
    console.error(`failed to create user connection`, error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create user connection',
    });
  }
};
