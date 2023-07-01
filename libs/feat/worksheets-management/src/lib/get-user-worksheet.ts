import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { HandlerFailure } from '@worksheets/util/next';
export const MAXIMUM_WORKSHEETS = 10;

const db = newWorksheetsDatabase();

export const getUserWorksheet = async (userId: string, worksheetId: string) => {
  const exists = await db.has(worksheetId);
  if (!exists) {
    throw new HandlerFailure({ code: 'not-found' });
  }
  const worksheet = await db.get(worksheetId);
  if (worksheet.uid !== userId) {
    throw new HandlerFailure({ code: 'unauthorized' });
  }

  return worksheet;
};

export const doesWorksheetExist = async (worksheetId: string) => {
  return await db.has(worksheetId);
};
