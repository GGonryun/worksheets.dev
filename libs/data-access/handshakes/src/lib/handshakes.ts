import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const handshakeEntitySchema = z.object({
  uid: z.string().describe('the user that initiated the handshake'),
  appId: z.string(),
  timestamp: z.number(),
  connectionId: z.string(),
  settingId: z.string(),
  ...entitySchema.shape,
});

export type HandshakeEntity = z.infer<typeof handshakeEntitySchema>;

export type HandshakeDatabase = FirestoreDatabase<HandshakeEntity>;

export const newHandshakesDatabase = (txn?: Txn) =>
  newFirestore<HandshakeEntity>('handshakes', txn);
