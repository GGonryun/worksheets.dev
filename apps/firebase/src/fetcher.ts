// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch, { RequestInit } from 'node-fetch';

// create a function that evaluates the baseurl from an envrionment variable
export const baseUrl = () => {
  // TODO: known issue with nx and firebase functions. The environment variables are not set correctly.
  // https://github.com/simondotm/nx-firebase/issues/29
  const url = process.env.APP_BASE_URL ?? 'http://localhost:4200/';
  if (!url) {
    throw new Error('APP_BASE_URL environment variable not set');
  }
  return url;
};

// create a fetch client that binds a base api url to the request and then lets me add api endpoints to it.
export const fetchClient = (baseUrl: string) => {
  const client = (endpoint: string, options: RequestInit = {}) => {
    return fetch(`${baseUrl}${endpoint}`, options);
  };
  return client;
};

// a helper method that automatically assigns the base url to the fetch client and returns a useable fetcher
export const fetcher = fetchClient(baseUrl());

// a logger for our fetch client that saves logs to the firebase functions logger and to firestore for later review
export const loggingFetcher = async (
  endpoint: string,
  options: RequestInit
) => {
  // log the fetch request to the firebase functions logger
  functions.logger.info('Fetching', { endpoint, options });
  // send the fetch request
  const response = await fetcher(endpoint, options);
  // log the response to the firebase functions logger
  functions.logger.info('Fetched', {
    baseUrl: baseUrl(),
    endpoint,
    options,
    status: response.status,
    statusText: response.statusText,
  });

  // save failures for later review
  if (response.status >= 400) {
    await admin
      .firestore()
      .collection('fetcher-logs')
      .add({
        baseUrl: baseUrl(),
        endpoint,
        options,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        response: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
  }
  // return the response
  return response;
};
