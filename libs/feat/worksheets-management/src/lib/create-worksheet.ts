import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { addWorksheetConnections } from './worksheets-connections';
import { CreateWorksheetRequest } from '@worksheets/schemas-worksheets';

const db = newWorksheetsDatabase();

export const createWorksheet = async (
  uid: string,
  entity: CreateWorksheetRequest
) => {
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
