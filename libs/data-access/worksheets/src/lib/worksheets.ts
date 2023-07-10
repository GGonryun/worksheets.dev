import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { worksheetsEntitySchema } from '@worksheets/schemas-worksheets';
import { z } from 'zod';

export type WorksheetEntity = z.infer<typeof worksheetsEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetEntity>('worksheets', txn);
