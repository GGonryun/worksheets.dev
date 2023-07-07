import {
  TaskEntity,
  findUsersQueuedExecutions,
  newProcessTaskBus,
  newTaskLoggingDatabase,
  newTaskSnapshotsDatabase,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';
import { Controller, ExecutionFactory } from '@worksheets/engine';
import { newEmptyLibrary } from '@worksheets/feat/execution-settings';
import { getWorksheet } from '@worksheets/feat/worksheets-management';
import { Maybe } from '@worksheets/util/types';
import {
  TaskCreationOverrides,
  newDefaultDeadlines,
  newDefaultVerbosity,
  safelyGetTask,
} from './util';
import { TaskLogger } from './util';
import { TRPCError } from '@trpc/server';
import { limits as serverLimits } from '@worksheets/feat/server-management';
import { quotas, limits as userLimits } from '@worksheets/feat/user-management';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const tasksDb = newTasksDatabase();
const snapshotsDb = newTaskSnapshotsDatabase();
const loggingDb = newTaskLoggingDatabase();
const processorBus = newProcessTaskBus();

export const createTask = async (
  taskId: string | undefined,
  worksheetId: string,
  input: unknown,
  // TODO: make optional
  options: TaskCreationOverrides
): Promise<string> => {
  const worksheet = await getWorksheet(worksheetId);

  // check the if the user has sufficient quota to execute the task
  if (
    !(await quotas.request({
      uid: worksheet.uid,
      type: 'executions',
      quantity: SERVER_SETTINGS.RESOURCE_CONSUMPTION.USER_WORKSHEET_EXECUTION,
    }))
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message:
        'You have exceeded your execution quota. Contact customer support to increase your quota.',
    });
  }

  const queuedTasks = await findUsersQueuedExecutions(tasksDb, worksheet.uid);
  if (
    await userLimits.exceeds({
      uid: worksheet.uid,
      type: 'maxQueuedExecutions',
      value: queuedTasks.length,
    })
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message:
        'You have too many queued worksheets. Try again later or contact customer support to increase your limits.',
    });
  }

  // prevent this worksheet from executing too much
  if (
    !(await serverLimits.throttle({
      id: worksheetId,
      meta: 'worksheet-executions',
      quantity:
        SERVER_SETTINGS.RESOURCE_CONSUMPTION.INDIVIDUAL_WORKSHEET_EXECUTION,
    }))
  ) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message:
        'This worksheet has exceeded its execution rate limit. Please try again in a minute.',
    });
  }

  if (
    !(await serverLimits.throttle({
      id: 'worksheet-executions',
      meta: 'system',
      quantity:
        SERVER_SETTINGS.RESOURCE_CONSUMPTION.SYSTEM_WORKSHEET_EXECUTIONS,
    }))
  ) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        "The system has exceeded it's worksheet creation rate limit. Please try again in a minute.",
    });
  }

  // TODO: add support for transactions. otherwise two executions could perform the work of trying to save the task before recognizing that the task may already exist.
  let task: Maybe<TaskEntity> = await safelyGetTask(tasksDb, taskId);
  // check if the task already exists
  if (task) {
    // check input to see if it is the same
    if (task.input !== input) {
      // if the input is not the same, throw an error
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Task already exists with different input',
      });
    }
    // if the task already exists, return the task id
    return task.id;
  }

  // set the task id to a new id if it is not provided
  taskId = taskId ?? tasksDb.id();

  const timeout =
    options?.timeout ??
    worksheet.timeout ??
    SERVER_SETTINGS.PROCESSING_DEADLINES.DEFAULT_TASK_TIMEOUT;
  // save the task early so that other processes don't try to start it too.
  task = await tasksDb.insert({
    id: taskId,
    userId: worksheet.uid,
    worksheetId: worksheetId,
    text: worksheet.text,
    // do not save as queued otherwise the task will be picked up by the processor
    state: 'pending',
    input,
    timeout,
    deadlines: newDefaultDeadlines(worksheet, timeout),
    verbosity: newDefaultVerbosity(worksheet, options),
    createdAt: Date.now(),
    updatedAt: 0,
    finishedAt: 0,
    delay: 0,
    duration: 0,
    retries: 0,
  });

  // create a new logger for the task
  const logger = new TaskLogger({
    db: loggingDb,
    task,
  });
  // neither the library nor the controller serve any purpose during serialization
  const library = newEmptyLibrary();
  const controller = new Controller();
  // create a new execution factory
  const factory = new ExecutionFactory({
    execution: { library, controller, logger },
    stack: { max: 100 },
  });

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
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Worksheet has no text',
    });
  }
  // save a logging statement
  logger.info('🕰️ Task queued for execution');
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
