import {
  TaskEntity,
  newProcessTaskBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { ExecutionFactory } from '@worksheets/engine';
import { newEmptyLibrary } from '@worksheets/feat/execution-settings';
import { getWorksheet } from '@worksheets/feat/worksheets-management';
import { HandlerFailure } from '@worksheets/util/next';
import { Maybe } from '@worksheets/util/types';
import { newDefaultDeadlines, safelyGetTask } from './util';

const tasksDb = newTasksDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();
const loggingDb = newTaskLoggingDatabase();
const processorBus = newProcessTaskBus();

export const createTask = async (
  taskId: string | undefined,
  worksheetId: string,
  input: unknown
): Promise<string> => {
  // TODO: add support for transactions. otherwise two executions could perform the work of trying to save the task before recognizing that the task may already exist.
  let task: Maybe<TaskEntity> = await safelyGetTask(tasksDb, taskId);
  // check if the task already exists
  if (task) {
    // check input to see if it is the same
    if (task.input !== input) {
      // if the input is not the same, throw an error
      throw new HandlerFailure({
        code: 'conflict',
        message: 'Task already exists with different input',
        data: { taskId, input },
      });
    }
    // if the task already exists, return the task id
    return task.id;
  }

  // set the task id to a new id if it is not provided
  taskId = taskId ?? tasksDb.id();

  // save the task early so that other processes don't try to start it too.
  task = await tasksDb.insert({
    id: taskId,
    worksheetId: worksheetId,
    text: '',
    // do not save as queued otherwise the task will be picked up by the processor
    state: 'pending',
    deadlines: newDefaultDeadlines(),
    input,
  });
  // TODO: check to see if the user has sufficient resources to perform request
  const worksheet = await getWorksheet(worksheetId);
  // the library serves no purpose here. it is only used to create an execution factory which is used to create an execution which is used to create a snapshot. the snapshot is what is used to execute the task.
  const library = newEmptyLibrary();
  // create a new execution factory
  const factory = new ExecutionFactory({ library });
  // use the factory to create a new execution. and provide it inputs
  const execution = await factory.create({ text: worksheet.text, input });
  // use the factory to serialize that execution so we can execute it later.
  const serialized = factory.serialize(execution);
  // save the snapshot of the execution.
  await snapshotsDb.insert({
    ...serialized,
    id: taskId,
  });
  // save a logging statement
  await loggingDb.insert({
    id: loggingDb.id(),
    message: 'Task queued for execution',
    level: 'trace',
    taskId,
  });
  // update the task db to reflect the new state.
  await tasksDb.update({
    ...task,
    text: worksheet.text,
    state: 'queued',
    updatedAt: Date.now(),
  });
  // send a pubsub message to the queue to start the task.
  await processorBus.publish({ taskId });

  return taskId;
};
