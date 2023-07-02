import {
  FirestoreDatabase,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const serverRateLimitEntity = z.object({
  id: z.string(),
  meta: z.string().describe('the category that this rate limit belongs to'),
  quantity: z.number(),
  replenish: z.number(),
});
export type ServerRateLimitEntity = z.infer<typeof serverRateLimitEntity>;
export type ServerRateLimitDatabase = FirestoreDatabase<ServerRateLimitEntity>;

export const newServerRateLimitDatabase = () => {
  return newFirestore<ServerRateLimitEntity>('serverratelimits');
};
