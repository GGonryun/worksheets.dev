import { TRPCError } from '@trpc/server';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const connections = newConnectionsDatabase();

export const deleteByApplication = async (opt: {
  appId: string;
  userId: string;
}) => {
  const connection = await connections.findOne(
    {
      f: 'appId',
      o: '==',
      v: opt.appId,
    },
    {
      f: 'userId',
      o: '==',
      v: opt.userId,
    }
  );

  return connections.delete(connection.id);
};
