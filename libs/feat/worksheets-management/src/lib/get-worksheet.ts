import { TRPCError } from '@trpc/server';
import { doesWorksheetExist } from './get-user-worksheet';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { DatabaseFailure } from '@worksheets/firebase/firestore';

const db = newWorksheetsDatabase();

export const getWorksheet = async (worksheetId: string) => {
  if (!doesWorksheetExist(worksheetId)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `worksheet does not exist in the database`,
    });
  }

  try {
    return await db.get(worksheetId);
  } catch (error) {
    if (error instanceof DatabaseFailure) {
      if (error.code === 'not-found') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `worksheet could not be found`,
        });
      }
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `worksheet could not be retrieved`,
    });
  }
};
