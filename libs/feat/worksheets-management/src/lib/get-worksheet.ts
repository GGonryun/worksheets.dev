import { HandlerFailure } from '@worksheets/util/next';
import { doesWorksheetExist } from './get-user-worksheet';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';

const db = newWorksheetsDatabase();

export const getWorksheet = async (worksheetId: string) => {
  if (!doesWorksheetExist(worksheetId)) {
    throw new HandlerFailure({
      code: 'not-found',
      message: `worksheet does not exist in the database`,
      data: { worksheetId },
    });
  }

  return await db.get(worksheetId);
};
