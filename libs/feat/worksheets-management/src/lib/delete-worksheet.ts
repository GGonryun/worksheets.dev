import {
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { newWorksheetsConnectionsDatabase } from '@worksheets/data-access/worksheets-connections';
import { doesUserOwnWorksheet } from './does-user-own-worksheet';
import { TRPCError } from '@trpc/server';

const loggingDb = newTaskLoggingDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();
const worksheetsdb = newWorksheetsDatabase();
const tasksDb = newTasksDatabase();
const connectionsDb = newWorksheetsConnectionsDatabase();

export const deleteWorksheet = async (userId: string, worksheetId: string) => {
  // check user access
  if (!(await doesUserOwnWorksheet(userId, worksheetId))) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You cannot delete this worksheet.',
    });
  }

  await worksheetsdb.delete(worksheetId);

  // also delete this worksheet's logs.
  // get all logs.
  const logs = await loggingDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });
  // delete all logs.
  for (const log of logs) {
    await loggingDb.delete(log.id);
  }

  // get all tasks.
  const tasks = await tasksDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });
  for (const task of tasks) {
    // delete all tasks.
    // delete all snapshots.
    await tasksDb.delete(task.id);
    await snapshotsDb.delete(task.id);
  }

  // delete all connection in join table.
  const connections = await connectionsDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });
  for (const connection of connections) {
    await connectionsDb.delete(connection.id);
  }
};
