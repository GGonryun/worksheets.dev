import { newTasksDatabase } from '@worksheets/data-access/tasks';
import {
  WorksheetEntity,
  newWorksheetsDatabase,
} from '@worksheets/data-access/worksheets';
import { HandlerFailure } from '@worksheets/util/next';
import { formatTimestamp } from '@worksheets/util/time';
import { z } from 'zod';

const worksheetsdb = newWorksheetsDatabase();
const tasksDb = newTasksDatabase();

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
  if (!(await doesUserOwnWorksheet(userId, worksheetId))) {
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

export const worksheetDataRowSchema = z.object({
  name: z.string(),
  id: z.string(),
  lastUpdated: z.string(),
  lastExecuted: z.string().optional(),
});

export const worksheetsDataTableSchema = z.array(worksheetDataRowSchema);
export type WorksheetsDataTable = z.infer<typeof worksheetsDataTableSchema>;

export const getWorksheetsDataTable = async (
  userId: string
): Promise<WorksheetsDataTable> => {
  const list = await listUsersWorksheets(userId);
  const rows: WorksheetsDataTable = [];
  for (const worksheetId in list) {
    const worksheet = list[worksheetId];
    // for each worksheet get it's last execution
    const data = await tasksDb.collection
      .where('worksheetId', '==', worksheetId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    const entities = tasksDb.parse(data);

    rows.push({
      name: worksheet.name,
      id: worksheet.id,
      lastUpdated: formatTimestamp(worksheet.updatedAt),
      lastExecuted: entities.length
        ? formatTimestamp(entities[0].createdAt)
        : undefined,
    });
  }
  return rows;
};
