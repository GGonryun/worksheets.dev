import { TRPCError } from '@trpc/server';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';

const db = newWorksheetsDatabase();

export const getUserWorksheet = async (userId: string, worksheetId: string) => {
  const exists = await db.has(worksheetId);
  if (!exists) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }
  const worksheet = await db.get(worksheetId);
  if (worksheet.uid !== userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return worksheet;
};

export const doesWorksheetExist = async (worksheetId: string) => {
  return await db.has(worksheetId);
};
