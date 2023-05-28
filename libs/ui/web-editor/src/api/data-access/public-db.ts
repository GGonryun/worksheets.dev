import { Txn } from '@worksheets/firebase/firestore';
import {
  WorksheetsDatabase,
  newExecutionsDatabase,
  newWorksheetsDatabase,
  ExecutionsDatabase,
  ExecutionEntity,
} from './common';
import { HandlerFailure } from '@worksheets/util/next';

export function newPublicDatabase(txn?: Txn) {
  const worksheetDb = newWorksheetsDatabase(txn);
  const executionsDb = newExecutionsDatabase(txn);
  return {
    worksheets: {
      get: getWorksheet(worksheetDb),
    },
    executions: {
      post: postExecutions(executionsDb),
      list: getExecutions(executionsDb),
      get: getExecution(executionsDb),
    },
  };
}

const getExecution = (db: ExecutionsDatabase) => async (id: string) => {
  if (!(await db.has(id))) {
    throw new HandlerFailure({ code: 'not-found' });
  }
  return await db.get(id);
};

const getExecutions = (db: ExecutionsDatabase) => async (id: string) => {
  const data = await db.collection
    .where('worksheetId', '==', id)
    .limit(20)
    .orderBy('timestamp', 'desc')
    .get();

  const entities = db.parse(data);

  return entities;
};
const postExecutions =
  (db: ExecutionsDatabase) => async (entity: ExecutionEntity) => {
    if (await db.has(entity.id)) {
      throw new HandlerFailure({
        code: 'conflict',
        message: `execution entity already exists`,
        data: entity,
      });
    }

    return await db.insert(entity);
  };

const getWorksheet = (db: WorksheetsDatabase) => async (id: string) => {
  if (!(await db.has(id))) {
    throw new HandlerFailure({
      code: 'not-found',
      message: `worksheet does not exist in the database`,
      data: { id },
    });
  }

  return await db.get(id);
};
