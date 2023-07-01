import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';

const db = newWorksheetsDatabase();

export const doesUserOwnWorksheet = async (
  userId: string,
  worksheetId: string
) => {
  const worksheet = await db.get(worksheetId);
  if (worksheet.uid !== userId) {
    return false;
  }

  return true;
};
