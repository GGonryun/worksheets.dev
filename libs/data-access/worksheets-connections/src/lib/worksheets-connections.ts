export function dataAccessWorksheetsConnections(): string {
  return 'data-access-worksheets-connections';
}

import {
  entitySchema,
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

// a join table for worksheets and connections
export const worksheetConnectionEntity = z.object({
  ...entitySchema.shape,
  uid: z.string(),
  appId: z.string(),
  worksheetId: z.string(),
  connectionId: z.string(),
});

export type WorksheetConnectionEntity = z.infer<
  typeof worksheetConnectionEntity
>;

export type WorksheetsConnectionsDatabase =
  FirestoreDatabase<WorksheetConnectionEntity>;

export const newWorksheetsConnectionsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetConnectionEntity>('worksheet-connections', txn);
