import {
  entitySchema,
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { addMinutesToCurrentTime } from '@worksheets/util/time';
import { z } from 'zod';

const logLevelEntity = z.enum([
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
]);

export type LogLevel = z.infer<typeof logLevelEntity>;

// keyed by type, taskid, timestamp
const taskLogEntity = z.object({
  // atomic key
  ...entitySchema.shape,
  // the task that these logs belong to.
  taskId: z.string(),
  // when this log was created
  createdAt: z.number().default(Date.now()),
  // contents of the log
  message: z.string(),
  // unstructured data
  data: z.unknown(),
  // the level of the log used to filter logs further
  level: logLevelEntity,
});

const taskSnapshotEntity = z.object({
  // a 1:1 relationship between snapshots and tasks
  // the id of the snapshot is the same as the task id
  ...entitySchema.shape,
  // serialized array of instructions
  instructions: z.array(z.string()),
  // serialized contents of execution memory
  memory: z.record(z.string()),
  // serialized protected keys
  register: z.record(z.string()),
});

// create a service level agreement for a task
const taskDeadlines = z.object({
  ['task-expiration']: z
    .number()
    .default(() => addMinutesToCurrentTime(2).getTime())
    .describe(
      'maximum time a worksheet can be active for, tasks will expire after this date'
    ),
  ['method-call-timeout']: z
    .number()
    .default(5)
    .describe('seconds before timing out an individual method call'),
  ['max-processor-runtime']: z
    .number()
    .default(10)
    // TODO: this is a problem because vercel limits our executions to 60 seconds.
    .describe('maximum seconds a single processor can hold a task for'),
  ['task-requeue-limit']: z
    .number()
    .default(10)
    .describe('number of times a task can be requeued'),
});

export type TaskDeadlines = z.infer<typeof taskDeadlines>;
export type TaskDeadlineContract = keyof TaskDeadlines;

export const taskPendingStateEntity = z.literal('pending');
export type TaskPendingState = z.infer<typeof taskPendingStateEntity>;

export const taskProcessableStateEntity = z.literal('queued');
export type TaskProcessableState = z.infer<typeof taskProcessableStateEntity>;

export const taskProcessingStateEntity = z.literal('running');
export type TaskProcessingState = z.infer<typeof taskProcessingStateEntity>;

export const taskCompleteStateEntity = z.union([
  z.literal('done'),
  z.literal('failed'),
  z.literal('expired'),
  z.literal('cancelled'),
]);
export type TaskCompleteState = z.infer<typeof taskCompleteStateEntity>;

export const taskStateEntity = z.union([
  taskPendingStateEntity,
  taskProcessableStateEntity,
  taskProcessingStateEntity,
  taskCompleteStateEntity,
]);

export const GLOBAL_TIMEOUT_CONTRACT = 'global-timeout';
export const PROCESS_TIMEOUT_CONTRACT = 'process-timeout';

export type TaskState = z.infer<typeof taskStateEntity>;

const taskEntity = z.object({
  // atomic key
  ...entitySchema.shape,
  // created at timestamp
  createdAt: z.number().default(Date.now()),
  // updated at timestamp
  updatedAt: z.number().default(Date.now()),
  // the number of processor jobs used to process this task
  retries: z.number().default(0),
  // the worksheet that started this task
  worksheetId: z.string(),
  // the raw text that started this task.
  text: z.string(),
  // key value pairs of the SLA ID and a number of seconds or units until expiration or termination.
  deadlines: taskDeadlines,
  // possible states a task may end up in
  state: taskStateEntity,
  // the output of this task (max 300KB)
  output: z.unknown().optional(),
  // the input of this task (max 300KB)
  input: z.unknown().optional(),
  // TODO: future properties of a task entity.
  // how quickly this task must be picked up
  // priority: z.number(),
  // task's that must be completed before this one runs.
  // dependencies: z.array(z.string()),
  // the processors that can pickup this task.
  // processors: z.union([
  //   z.literal('worksheets@v1'),
  //   z.literal('worksheets@latest'),
  // ]),
  // references to shared memory for concurrent data access
  // storageIds: z.array(z.string()),
});

export type TaskSnapshotEntity = z.infer<typeof taskSnapshotEntity>;
export type TaskEntity = z.infer<typeof taskEntity>;
export type TaskLogEntity = z.infer<typeof taskLogEntity>;

export type TasksDatabase = FirestoreDatabase<TaskEntity>;
export type TaskSnapshotsDatabase = FirestoreDatabase<TaskSnapshotEntity>;
export type TaskLoggingDatabase = FirestoreDatabase<TaskLogEntity>;

export const newTasksDatabase = (txn?: Txn) =>
  newFirestore<TaskEntity>('tasks', txn);

export const newTaskSnapshotsDatabase = (txn?: Txn) =>
  newFirestore<TaskSnapshotEntity>('snapshots', txn);

export const newTaskLoggingDatabase = (txn?: Txn) =>
  newFirestore<TaskLogEntity>('logs', txn);
