import {
  newProcessTaskBus,
  newTasksDatabase,
} from '@worksheets/data-access/tasks';

const db = newTasksDatabase();
const bus = newProcessTaskBus();

/**
 * @name pushTasksToCompletion
 * @description searches for tasks that are not completed yet and sends a processing message for them.
 * @param {number} max the maximum number of tasks to process
 * @returns {Promise<number>} a promise that resolves when the tasks have been processed
 */
export const pushTasksToCompletion = async (max: number): Promise<number> => {
  // get all tasks that are not queued or requeued or building or pending
  const data = await db.collection
    .where('state', 'in', ['queued', 'pending'])
    .limit(max)
    .orderBy('updatedAt', 'desc')
    .get();

  // if there are no tasks to process, return 0
  if (data.empty) {
    return 0;
  }

  // parse the data into entities
  const entities = db.parse(data);

  // create an empty promise group and push a promise for each task that we need to publish to the bus
  const promises: Promise<string>[] = [];
  entities.forEach((entity) => {
    promises.push(bus.publish({ taskId: entity.id }));
  });

  // return the total number of promises that passed and log all the ones that failed
  return Promise.allSettled(promises).then((results) => {
    let count = 0;
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        count++;
      } else {
        console.error('failed to publish process task message', result);
      }
    });
    return count;
  });
};
