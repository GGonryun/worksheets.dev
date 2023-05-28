import {
  executionDimensionsSchema,
  executionFailureCodeSchema,
} from '@worksheets/engine';

import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const worksheetsEntitySchema = z.object({
  text: z.string(),
  uid: z.string(),
  ...entitySchema.shape,
});
export type WorksheetsEntity = z.infer<typeof worksheetsEntitySchema>;

export const executionErrorSchema = z.object({
  code: executionFailureCodeSchema,
  message: z.string(),
});

export type ExecutionErrorEntity = z.infer<typeof executionErrorSchema>;

export const executionResultSchema = z.object({
  error: executionErrorSchema.optional(),
  input: z.unknown().optional(),
  output: z.unknown().optional(),
});

export const executionEntitySchema = z.object({
  worksheetId: z.string(),
  timestamp: z.number(),
  text: z.string().optional(),
  result: executionResultSchema.optional(),
  dimensions: executionDimensionsSchema,
  ...entitySchema.shape,
});

export type ExecutionEntity = z.infer<typeof executionEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetsEntity>;
export type ExecutionsDatabase = FirestoreDatabase<ExecutionEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetsEntity>('worksheets', txn);
export const newExecutionsDatabase = (txn?: Txn) =>
  newFirestore<ExecutionEntity>('executions', txn);
