import {
  TaskEntity,
  newProcessTaskBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { Controller, ExecutionFactory } from '@worksheets/engine';
import { newEmptyLibrary } from '@worksheets/feat/execution-settings';
import { getWorksheet } from '@worksheets/feat/worksheets-management';
import { HandlerFailure } from '@worksheets/util/next';
import { Maybe } from '@worksheets/util/types';
import { newDefaultDeadlines, safelyGetTask } from './util';
import { TaskLogger } from './util';

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
    createdAt: Date.now(),
    updatedAt: Date.now(),
    retries: 0,
  });
  // create a new logger for the task
  const logger = new TaskLogger({ db: loggingDb, task });
  // neither the library nor the controller serve any purpose during serialization
  const library = newEmptyLibrary();
  const controller = new Controller();
  // create a new execution factory
  const factory = new ExecutionFactory({ library, controller, logger });
  // TODO: check to see if the user has sufficient resources to perform request
  const worksheet = await getWorksheet(worksheetId);
  // use the factory to create a new execution. and provide it inputs
  const execution = await factory.create({ text: worksheet.text, input });
  // use the factory to serialize that execution so we can execute it later.
  const serialized = factory.serialize(execution);
  // save the snapshot of the execution.
  await snapshotsDb.insert({
    ...serialized,
    id: taskId,
  });

  // throw an error if worksheet has no text set
  if (!worksheet.text) {
    throw new HandlerFailure({
      code: 'bad-request',
      message: 'Worksheet has no text',
      data: { worksheetId },
    });
  }
  // save a logging statement
  logger.trace('Task queued for execution');
  // update the task db to reflect the new state.
  await tasksDb.update({
    ...task,
    text: worksheet.text,
    state: 'queued',
    updatedAt: Date.now(),
  });
  // send a pubsub message to the queue to start the task.
  await processorBus.publish({ taskId });

  console.info(`Task ${taskId} queued for execution`);
  return taskId;
};
