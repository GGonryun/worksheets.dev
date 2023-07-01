import {
  newWorksheetsDatabase,
  worksheetsEntitySchema,
} from '@worksheets/data-access/worksheets';
import { HandlerFailure } from '@worksheets/util/next';
import { z } from 'zod';
import { listUsersWorksheets } from './list-user-worksheets';
import { MAXIMUM_WORKSHEETS } from './get-user-worksheet';

const db = newWorksheetsDatabase();

export const createWorksheetRequestSchema = worksheetsEntitySchema.pick({
  name: true,
  text: true,
  description: true,
  logLevel: true,
  timeout: true,
});

export const createWorksheet = async (
  uid: string,
  entity: z.infer<typeof createWorksheetRequestSchema>
) => {
  console.info(`creating a new worksheet for user ${uid}`);
  const records = await listUsersWorksheets(uid);
  const numRecords = Object.keys(records).length;

  if (numRecords >= MAXIMUM_WORKSHEETS) {
    throw new HandlerFailure({
      code: 'resource-exhausted',
      message: 'maximum worksheets threshold reached',
    });
  }

  const id = db.id();
  console.info('upserting worksheet', id);
  await db.insert({
    ...entity,
    id,
    uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    enabled: true,
  });
  return id;
};
