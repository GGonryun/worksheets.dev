import {
  WorksheetEntity,
  newWorksheetsDatabase,
} from '@worksheets/data-access/worksheets';

const db = newWorksheetsDatabase();

export const listUsersWorksheets = async (userId: string) => {
  const list = await db.query({ f: 'uid', o: '==', v: userId });
  const map: Record<string, WorksheetEntity> = {};
  for (const entity of list) {
    map[entity.id] = entity;
  }
  return map;
};
