import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const connectionsDb = newConnectionsDatabase();

export const deleteUserConnections = async (input: {
  userId: string;
  connectionIds: string[];
}): Promise<{
  ok: boolean;
}> => {
  const promises = [];
  for (const connectionId of input.connectionIds) {
    promises.push(connectionsDb.delete(connectionId));
  }

  try {
    await Promise.all(promises);
    return { ok: true };
  } catch (error) {
    console.error(`Failed to delete user connections`, input, error);
    return { ok: false };
  }
};
