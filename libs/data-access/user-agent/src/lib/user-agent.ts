import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
});

export const flagsSchema = z.enum([
  'verified',
  'suspended',
  'beta',
  'premium',
  'overclock',
  'admin',
  'user',
]);

export const userFlagsEntity = z.object({
  ...entitySchema.shape,
  flags: z.array(flagsSchema),
});

export const userLimitsEntity = z.object({
  ...entitySchema.shape,
  maxApiTokens: z.number(),
  maxWorksheets: z.number(),
  maxActiveTasks: z.number(),
});

export const userQuotasEntity = z.object({
  ...entitySchema.shape,
  tokenUses: z.number(),
  executions: z.number(),
  methodCalls: z.number(),
  processingTime: z.number().describe('in milliseconds'),
});

export type UserLimitsEntity = z.infer<typeof userLimitsEntity>;
export type UserFlagsEntity = z.infer<typeof userFlagsEntity>;
export type UserQuotasEntity = z.infer<typeof userQuotasEntity>;

export type UserLimitsDatabase = FirestoreDatabase<UserLimitsEntity>;
export type UserFlagsDatabase = FirestoreDatabase<UserFlagsEntity>;
export type UserQuotaDatabase = FirestoreDatabase<UserQuotasEntity>;

export const newUserFlagsDatabase = (txn?: Txn) =>
  newFirestore<UserFlagsEntity>('userflags', txn);

export const newUserLimitsDatabase = (txn?: Txn) =>
  newFirestore<UserLimitsEntity>('userlimits', txn);

export const newUserQuotasDatabase = (txn?: Txn) =>
  newFirestore<UserQuotasEntity>('userquotas', txn);
