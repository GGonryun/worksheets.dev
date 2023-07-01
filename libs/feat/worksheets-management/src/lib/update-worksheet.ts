import {
  newWorksheetsDatabase,
  worksheetsEntitySchema,
} from '@worksheets/data-access/worksheets';
import { z } from 'zod';
import { getUserWorksheet } from './get-user-worksheet';

const db = newWorksheetsDatabase();

export const updateWorksheetRequestSchema = worksheetsEntitySchema
  .required({ id: true })
  .partial({
    name: true,
    text: true,
    description: true,
    logLevel: true,
    enabled: true,
    timeout: true,
  })
  .omit({ uid: true, createdAt: true, updatedAt: true });

export const updateWorksheetResponseSchema = worksheetsEntitySchema.omit({
  uid: true,
});

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
