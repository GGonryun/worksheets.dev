import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import {
  TaskEntity,
  TaskSnapshotEntity,
  TaskLogEntity,
} from '@worksheets/schemas-executions';

export type TasksDatabase = FirestoreDatabase<TaskEntity>;
export type TaskSnapshotsDatabase = FirestoreDatabase<TaskSnapshotEntity>;
export type TaskLoggingDatabase = FirestoreDatabase<TaskLogEntity>;

export const newTasksDatabase = (txn?: Txn) =>
  newFirestore<TaskEntity>('tasks', txn);

export const newTaskSnapshotsDatabase = (txn?: Txn) =>
  newFirestore<TaskSnapshotEntity>('snapshots', txn);

export const newTaskLoggingDatabase = (txn?: Txn) =>
  newFirestore<TaskLogEntity>('logs', txn);

export const findUsersQueuedExecutions = async (
  db: TasksDatabase,
  userId: string
): Promise<TaskEntity[]> => {
  const all = await db.query({
    f: 'userId',
    o: '==',
    v: userId,
  });

  return all.filter(
    (task) => task.state === 'pending' || task.state === 'queued'
  );
};

export const findUsersRunningExecutions = async (
  db: TasksDatabase,
  userId: string
): Promise<TaskEntity[]> => {
  const all = await db.query({
    f: 'userId',
    o: '==',
    v: userId,
  });

  return all.filter((task) => task.state === 'running');
};
