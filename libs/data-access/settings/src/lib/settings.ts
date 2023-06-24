import { z } from 'zod';
import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';

export const connectionEntity = z.object({
  ...entitySchema.shape,
  uid: z.string().describe('the owner of the setting'),
  name: z.string().describe('a user friendly name for the connection'),
  appId: z.string().describe('the application id'),
  settings: z.record(z.unknown()).describe('the settings for the application'),
  updatedAt: z.number(),
});
export type ConnectionsDatabase = FirestoreDatabase<ConnectionEntity>;

export type ConnectionEntity = z.infer<typeof connectionEntity>;

export const newConnectionDatabase = (txn?: Txn) =>
  newFirestore<ConnectionEntity>('connections', txn);
