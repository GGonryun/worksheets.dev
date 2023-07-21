// import {
//   newProcessTaskBus,
//   newTasksDatabase,
// } from '@worksheets/data-access/tasks';

// const db = newTasksDatabase();
// const bus = newProcessTaskBus();

// /**
//  * @name pushTasksToCompletion
//  * @description searches for tasks that are not completed yet and sends a processing message for them.
//  * @param {number} max the maximum number of tasks to process
//  * @returns {Promise<number>} a promise that resolves when the tasks have been processed
//  */
// export const pushTasksToCompletion = async (max: number): Promise<number> => {
//   const data = await db.collection
//     // get all tasks that might be ready to process
//     .where('state', 'in', ['queued', 'pending'])
//     .orderBy('createdAt', 'desc')
//     // limit the number of tasks to process
//     .limit(max)
//     // get the data
//     .get();

//   // if there are no tasks to process, return 0
//   if (data.empty) {
//     console.info('[REAPER] Shutting down. No available tasks to process.');
//     return 0;
//   }

//   // parse the data into entities
//   const entities = db.parse(data);
//   console.info(
//     '[REAPER] Searching for tasks to drive to completion',
//     entities.length
//   );

//   // filter out tasks that have a delay set with an offset greater than 2 minutes
//   const now = new Date().getTime();
//   const filtered = entities.filter((entity) => {
//     const offset = entity.delay - now;
//     return offset < 2 * 60 * 1000;
//   });

//   if (filtered.length !== entities.length) {
//     // log how many tasks were filtered out
//     console.info(
//       `Filtered out ${
//         entities.length - filtered.length
//       } incoming tasks that are almost ready for processing`
//     );
//   }

//   // if there are no tasks to process, return 0
//   if (filtered.length === 0) {
//     return 0;
//   }

//   // create an empty promise group and push a promise for each task that we need to publish to the bus
//   const promises: Promise<string>[] = [];
//   filtered.forEach((entity) => {
//     promises.push(bus.publish({ taskId: entity.id }));
//   });

//   // return the total number of promises that passed and log all the ones that failed
//   return Promise.allSettled(promises).then((results) => {
//     let count = 0;
//     results.forEach((result) => {
//       if (result.status === 'fulfilled') {
//         count++;
//       } else {
//         console.error('failed to publish process task message', result);
//       }
//     });
//     return count;
//   });
// };
