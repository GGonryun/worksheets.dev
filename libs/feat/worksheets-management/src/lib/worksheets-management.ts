import {
  WorksheetEntity,
  newWorksheetsDatabase,
} from '@worksheets/data-access/worksheets';
import { HandlerFailure } from '@worksheets/util/next';

const worksheetsdb = newWorksheetsDatabase();

export const doesUserOwnWorksheet = async (
  userId: string,
  worksheetId: string
) => {
  const worksheet = await worksheetsdb.get(worksheetId);
  if (worksheet.uid !== userId) {
    return false;
  }

  return true;
};

export const deleteWorksheet = async (userId: string, worksheetId: string) => {
  // check user access
  if (!(await doesUserOwnWorksheet(worksheetId, userId))) {
    throw new HandlerFailure({ code: 'unauthorized' });
  }

  await worksheetsdb.delete(worksheetId);
};

export const listUsersWorksheets = async (userId: string) => {
  const list = await worksheetsdb.query({ f: 'uid', o: '==', v: userId });
  const map: Record<string, WorksheetEntity> = {};
  for (const entity of list) {
    map[entity.id] = entity;
  }
  return map;
};

export const getUserWorksheet = async (userId: string, worksheetId: string) => {
  const exists = await worksheetsdb.has(worksheetId);
  if (!exists) {
    throw new HandlerFailure({ code: 'not-found' });
  }
  const worksheet = await worksheetsdb.get(worksheetId);
  if (worksheet.uid !== userId) {
    throw new HandlerFailure({ code: 'unauthorized' });
  }

  return worksheet;
};

const DEFAULT_WORKSHEET_USER = 'anonymous';

export const upsertWorksheet = async (update: Partial<WorksheetEntity>) => {
  const id = update.id ?? worksheetsdb.id();
  const uid = update.uid ?? DEFAULT_WORKSHEET_USER;
  const text = update.text ?? '';
  const entity: WorksheetEntity = { text, id, uid };

  return await worksheetsdb.updateOrInsert(entity);
};

export const createWorksheet = async () => {
  return await worksheetsdb.insert({
    id: worksheetsdb.id(),
    text: '',
    uid: 'anonymous',
  });
};

export const doesWorksheetExist = async (worksheetId: string) => {
  return await worksheetsdb.has(worksheetId);
};

export const isUserOwnerOfWorksheet = async (
  userId: string,
  worksheetId: string
) => {
  try {
    await getUserWorksheet(userId, worksheetId);
    return true;
  } catch (error) {
    if (error instanceof HandlerFailure) {
      return false;
    }
    throw error;
  }
};

export const getWorksheet = async (worksheetId: string) => {
  if (!doesWorksheetExist(worksheetId)) {
    throw new HandlerFailure({
      code: 'not-found',
      message: `worksheet does not exist in the database`,
      data: { worksheetId },
    });
  }

  return await worksheetsdb.get(worksheetId);
};
