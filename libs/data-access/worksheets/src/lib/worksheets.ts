import { logLevelEntity } from '@worksheets/data-access/tasks';
import {
  entitySchema,
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const worksheetsEntitySchema = z.object({
  ...entitySchema.shape,
  uid: z.string(),
  name: z.string(),
  text: z.string(),
  description: z.string(),
  lastUpdated: z.number().describe('a unix ms timestamp'),
  logging: logLevelEntity,
  trigger: z.string(), //trigger id (unique id that can be used to directly execute the worksheet, must be unique on your account)
});

export type WorksheetEntity = z.infer<typeof worksheetsEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetEntity>('worksheets', txn);
