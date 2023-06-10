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

// TODO: a lot of these data methods don't make anymore sense because we're refactoring them into the Task + Snapshot paradigm.
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
  userId: z.string().optional(),
  timestamp: z.number(),
  text: z.string().optional(),
  result: executionResultSchema.optional(),
  dimensions: executionDimensionsSchema,
  ...entitySchema.shape,
});

export type ExecutionEntity = z.infer<typeof executionEntitySchema>;

export type ExecutionsDatabase = FirestoreDatabase<ExecutionEntity>;

export const newExecutionsDatabase = (txn?: Txn) =>
  newFirestore<ExecutionEntity>('executions', txn);
