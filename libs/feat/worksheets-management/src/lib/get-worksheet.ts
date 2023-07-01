import { TRPCError } from '@trpc/server';
import { doesWorksheetExist } from './get-user-worksheet';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';

const db = newWorksheetsDatabase();

export const getWorksheet = async (worksheetId: string) => {
  if (!doesWorksheetExist(worksheetId)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `worksheet does not exist in the database`,
    });
  }

  return await db.get(worksheetId);
};
