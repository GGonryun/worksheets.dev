// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Firebase Features from within Cloud Functions.
import * as admin from 'firebase-admin';
import { fetcher } from './fetcher';
admin.initializeApp();

// Set up extra settings. Since May 29, 2020, Firebase Firebase Added support for
// calling FirebaseFirestore.settings with { ignoreUndefinedProperties: true }.
// When this parameter is set, Cloud Firestore ignores undefined properties
// inside objects rather than rejecting the API call.
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

// TODO: do not rely on making calls back to the worksheets.dev API. Instead, use a shared library to process tasks.
export const taskProcessor = functions.pubsub
  .topic('process-tasks')
  .onPublish(async (message) => {
    // get the task id from the message
    const taskId = message.json.taskId;
    // write a log message
    functions.logger.info('Processing task', { taskId });
    // send a post request to task processor at
    const response = await fetcher(`/api/executions/${taskId}/process`, {
      method: 'POST',
    });

    return response.status;
  });

// task complete is a pubsub function that executes when a task is completed. it sends a request to the internal notification system so that we can alert user's about task completion.
export const taskComplete = functions.pubsub
  .topic('task-complete')
  .onPublish(async (message) => {
    // log the message
    functions.logger.info('Task processing is done', { message });
  });

// the task reaper is a pubsub function that executes every 10 minutes and sends a request to the api to check for tasks that have been running for too long.
export const taskReaper = functions.pubsub
  // .schedule('* * * * *')
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    // send the fetch request to the worksheets.dev task reaper endpoint
    const response = await fetcher(`/api/executions/reaper`, {
      method: 'DELETE',
      // send the request with a json body that contains the current time
      body: JSON.stringify({
        timestamp: context.timestamp,
      }),
    });

    return response.status;
  });

export const limitsReaper = functions.pubsub
  .schedule('every 3 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/limits/reaper`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });

    return response.status;
  });

// TODO:
export const handshakesReaper = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/garbage/reaper`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });

    return response.status;
  });

// TODO:
export const loggingReaper = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/logging/reaper`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });
    return response.status;
  });

// TODO:
export const tasksReaper = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/executions/reaper`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });
    return response.status;
  });
