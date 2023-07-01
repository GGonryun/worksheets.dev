import { z } from 'zod';
import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';

export const apiTokenEntity = z.object({
  ...entitySchema.shape,
  hash: z.string().describe('the actual token to compare against'),
  uid: z.string().describe('the owner of the setting'),
  name: z.string().describe('the name of the token'),
  expires: z.number().describe('the tiemstamp the token expires'),
  createdAt: z.number().describe('the timestamp the token was created'),
});
export type ApiTokenDatabase = FirestoreDatabase<ApiTokenEntity>;

export type ApiTokenEntity = z.infer<typeof apiTokenEntity>;

export const newApiTokenDatabase = (txn?: Txn) =>
  newFirestore<ApiTokenEntity>('apitokens', txn);
