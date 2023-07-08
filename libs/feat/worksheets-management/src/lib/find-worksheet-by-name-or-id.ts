import { TRPCError } from '@trpc/server';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { logger } from '@worksheets/feat/logging';

const db = newWorksheetsDatabase();

export const findWorksheetByNameOrIdentifier = async (
  userId: string,
  name: string
) => {
  if (await db.has(name)) {
    return db.get(name);
  }

  const worksheets = await db.query(
    { f: 'uid', o: '==', v: userId },
    { f: 'name', o: '==', v: name }
  );

  if (worksheets.length === 1) {
    return worksheets[0];
  } else if (worksheets.length > 1) {
    logger.warn('user has multiple worksheets with the same name', {
      userId,
      name,
    });
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: 'You cannot have two worksheets with the same name.',
    });
  } else {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Worksheet not found.',
    });
  }
};
