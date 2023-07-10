import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { z } from 'zod';
import { getUserWorksheet } from './get-user-worksheet';
import {
  updateWorksheetRequestSchema,
  updateWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

const db = newWorksheetsDatabase();

export const updateWorksheet = async (
  uid: string,
  entity: z.infer<typeof updateWorksheetRequestSchema>
): Promise<z.infer<typeof updateWorksheetResponseSchema>> => {
  // get worksheet
  const worksheet = await getUserWorksheet(uid, entity.id);

  // throw away uid from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uid: _, ...updated } = await db.update({
    ...worksheet,
    ...entity,
    updatedAt: Date.now(),
  });

  return updated;
};
