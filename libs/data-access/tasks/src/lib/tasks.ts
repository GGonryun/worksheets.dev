import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

const snapshotEntity = z.object({
  instructions: z.array(z.string()),
  memory: z.record(z.string()),
  register: z.record(z.string()),
});

const taskSchema = z.object({
  ...entitySchema.shape,
  worksheetId: z.string(),
  userId: z.string(),
  snapshot: snapshotEntity,
  output: z.unknown(),
  input: z.unknown(),
});

export type SnapshotEntity = z.infer<typeof snapshotEntity>;
export type TaskEntity = z.infer<typeof taskSchema>;

export type TaskDatabase = FirestoreDatabase<TaskEntity>;

export const newTasksDatabase = (txn?: Txn) =>
  newFirestore<TaskEntity>('tasks', txn);
