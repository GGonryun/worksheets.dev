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
    // send a post request to task processor at worksheets.dev/api/process/:taskId
    const response = await fetcher(`/api/process/${taskId}`, {
      method: 'POST',
    });

    return response.status;
  });

// the task process observer is a pubsub function that executes every 10 minutes and sends a request to the task reaper to check for tasks that have been running for too long.
export const taskProcessObserver = functions.pubsub
  .schedule('* * * * *')
  .onRun(async (context) => {
    // send the fetch request to the worksheets.dev task reaper endpoint
    const response = await fetcher(`/api/processor/reap`, {
      method: 'POST',
      // send the request with a json body that contains the current time
      body: JSON.stringify({
        timestamp: context.timestamp,
      }),
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
