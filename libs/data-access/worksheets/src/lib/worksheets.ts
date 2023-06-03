import {
  entitySchema,
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const worksheetsEntitySchema = z.object({
  text: z.string(),
  uid: z.string(),
  ...entitySchema.shape,
});

export type WorksheetEntity = z.infer<typeof worksheetsEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetEntity>('worksheets', txn);
