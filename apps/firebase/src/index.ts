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

export const methodExecutionReaper = functions.pubsub
  .schedule('every 2 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/reapers/executions`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });

    return response.status;
  });

export const limitsReaper = functions.pubsub
  .schedule('every 8 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/reapers/limits`, {
      method: 'DELETE',
      body: JSON.stringify({}),
    });

    return response.status;
  });

export const userQuotaReplenisher = functions.pubsub
  .schedule('every 2 hours')
  .onRun(async () => {
    const response = await fetcher(`/api/replenishers/quotas`, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    return response.status;
  });
