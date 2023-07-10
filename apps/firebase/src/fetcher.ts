// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import fetch, { RequestInit } from 'node-fetch';

// create a function that evaluates the baseurl from an envrionment variable
export const baseUrl = () => {
  // TODO: known issue with nx and firebase functions. The environment variables are not set correctly.
  // https://github.com/simondotm/nx-firebase/issues/29
  // const url = process.env.ADMIN_BASE_URL ?? 'http://localhost:4202';
  const url = 'http://localhost:4202';
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
