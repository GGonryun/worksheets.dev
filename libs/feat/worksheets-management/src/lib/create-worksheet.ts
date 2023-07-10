import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { listUsersWorksheets } from './list-user-worksheets';
import { TRPCError } from '@trpc/server';
import { limits } from '@worksheets/feat/user-management';
import { addWorksheetConnections } from './worksheets-connections';
import { CreateWorksheetRequest } from '@worksheets/schemas-worksheets';

const db = newWorksheetsDatabase();

export const createWorksheet = async (
  uid: string,
  entity: CreateWorksheetRequest
) => {
  console.info(`creating a new worksheet for user ${uid}`);
  const records = await listUsersWorksheets(uid);
  const numRecords = Object.keys(records).length;

  if (
    await limits.exceeds({ uid, type: 'maxWorksheets', value: numRecords + 1 })
  ) {
    console.error(`user has exceeded their maximum number of worksheets`, {
      userId: uid,
    });
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: `You have exceeded your maximum number of worksheets.`,
    });
  }

  const id = db.id();

  await db.insert({
    ...entity,
    description: entity.description || '',
    timeout: entity.timeout || 600,
    id,
    uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    enabled: true,
    logLevel: 'trace',
  });

  if (entity.connections) {
    await addWorksheetConnections({
      worksheetId: id,
      userId: uid,
      connectionIds: entity.connections,
    });
  }

  return id;
};
