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

export const userAgentSchema = z.object({
  uid: z.string(),
  email: z.string().optional(),
  emailVerified: z.boolean(),
  disabled: z.boolean(),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  phoneNumber: z.string().optional(),
  metadata: z.object({
    lastSignInTime: z.string(),
    creationTime: z.string(),
  }),
});

export const userLimitsEntity = z.object({
  ...entitySchema.shape,
  executionHistoryRetention: z.number().describe('in days'),
  logRetention: z.number().describe('in days'),
  maxApiTokens: z.number(),
  maxConnections: z.number(),
  maxWorksheets: z.number(),
  maxQueuedExecutions: z
    .number()
    .describe(
      'the maximum number of executions that can be queued at any given time, new tasks cannot be created if exceeded.'
    ),
  maxRunningExecutions: z
    .number()
    .describe('max number of concurrently running executions allowed per user'),
});

const quota = (resourceName: string) =>
  z.object({
    current: z.number().describe(`how many ${resourceName} uses remaining`),
    resetTo: z
      .number()
      .describe(
        `how many ${resourceName} uses the user has in total. when the current cycle ends the user will be reset to this value`
      ),
  });

export const userQuotasEntity = z.object({
  ...entitySchema.shape,
  createdAt: z.number().describe('timestamp of creation date, in milliseconds'),
  enabled: z.boolean().default(true),
  overclocked: z.boolean().default(false),
  tokenUses: quota('api token'),
  executions: quota('worksheet execution'),
  methodCalls: quota('method call'),
  processingTime: quota('processing time').describe('in milliseconds'),
});

export type UserLimitsEntity = z.infer<typeof userLimitsEntity>;
export type UserQuotasEntity = z.infer<typeof userQuotasEntity>;

export type UserLimitsDatabase = FirestoreDatabase<UserLimitsEntity>;
export type UserQuotaDatabase = FirestoreDatabase<UserQuotasEntity>;

export const newUserLimitsDatabase = (txn?: Txn) =>
  newFirestore<UserLimitsEntity>('userlimits', txn);

export const newUserQuotasDatabase = (txn?: Txn) =>
  newFirestore<UserQuotasEntity>('userquotas', txn);
