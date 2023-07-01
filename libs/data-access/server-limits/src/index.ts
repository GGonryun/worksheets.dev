import {
  FirestoreDatabase,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const serverOperationLimitEntity = z.object({
  id: z.union([
    z.literal('trpc-requests'),
    z.literal('api-requests'),
    z.literal('executions'),
    z.literal('processingTime'),
  ]),
  quantity: z.number(),
  replenish: z
    .number()
    .describe(
      "millisecond timestamp of when this limit's quantity should be replenished"
    ),
});
export type ServerOperationLimitEntity = z.infer<
  typeof serverOperationLimitEntity
>;
export type ServerOperationLimitDatabase =
  FirestoreDatabase<ServerOperationLimitEntity>;

export const newServerOperationLimitDatabase = () => {
  return newFirestore<ServerOperationLimitEntity>('serveroperationlimits');
};

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
