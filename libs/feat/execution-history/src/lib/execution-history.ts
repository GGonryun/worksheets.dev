import {
  ExecutionEntity,
  newExecutionsDatabase,
} from '@worksheets/data-access/executions';
import {
  doesUserOwnWorksheet,
  doesWorksheetExist,
  isUserOwnerOfWorksheet,
} from '@worksheets/feat/worksheets-management';
import { HandlerFailure } from '@worksheets/util/next';

const executionsdb = newExecutionsDatabase();

export const clearWorksheetExecutions = async (
  userId: string,
  worksheetId: string
) => {
  // check user access to worksheet if it exists
  const hasWorksheet = await doesWorksheetExist(worksheetId);

  if (!hasWorksheet) {
    throw new HandlerFailure({
      code: 'not-found',
      message: 'cannot clear executions for a worksheet that does not exist',
      data: { worksheetId },
    });
  }

  const isOwner = await isUserOwnerOfWorksheet(userId, worksheetId);
  if (!isOwner) {
    throw new HandlerFailure({
      code: 'unauthorized',
      message: 'user does not have permissions to access worksheet',
      cause: { userId, worksheetId },
    });
  }

  // get executions and delete them.
  const executions = await executionsdb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });

  const promises: Promise<unknown>[] = [];
  for (const exe of executions) {
    promises.push(executionsdb.delete(exe.id));
  }
  await Promise.all(promises);

  console.info(`deleted ${executions.length} executions`);
  return true;
};

export const deleteExecution = async (userId: string, executionId: string) => {
  if (!(await executionsdb.has(executionId))) {
    throw new HandlerFailure({
      code: 'not-found',
    });
  }

  const execution = await executionsdb.get(executionId);

  // check user access to worksheet.
  if (!(await doesUserOwnWorksheet(userId, execution.worksheetId))) {
    throw new HandlerFailure({ code: 'unauthorized' });
  }

  // delete individual execution if owner.
  await executionsdb.delete(executionId);

  return true;
};

export const getExecution = async (executionId: string) => {
  if (!(await executionsdb.has(executionId))) {
    throw new HandlerFailure({
      code: 'not-found',
    });
  }
  return await executionsdb.get(executionId);
};

export const listWorksheetExecutions = async (worksheetId: string) => {
  const data = await executionsdb.collection
    .where('worksheetId', '==', worksheetId)
    .limit(20)
    .orderBy('timestamp', 'desc')
    .get();

  const entities = executionsdb.parse(data);

  return entities;
};

export const createExecution = async (entity: Omit<ExecutionEntity, 'id'>) =>
  await executionsdb.insert({ ...entity, id: executionsdb.id() });
