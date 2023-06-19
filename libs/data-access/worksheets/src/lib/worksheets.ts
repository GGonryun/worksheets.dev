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
  createdAt: z.number().describe('a unix ms timestamp'),
  updatedAt: z.number().describe('a unix ms timestamp'),
  logging: logLevelEntity,
});

export type WorksheetEntity = z.infer<typeof worksheetsEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetEntity>('worksheets', txn);
