import * as firebase from 'firebase-admin';
import { PubSub as PS } from '@google-cloud/pubsub';

function admin(): firebase.app.App {
  try {
    if (firebase.apps.length > 0) {
      const apps = firebase.apps.filter((app) => app != null);
      const app = apps[0];
      if (!app) {
        throw new Error(`Firebase initialized an empty app`);
      }
      return app;
    }
    const cert = {
      projectId: process.env['FIREBASE_PROJECT_ID'],
      clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
      privateKey:
        process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n') || '',
    };

    const app = firebase.initializeApp({
      credential: firebase.credential.cert(cert),
      databaseURL: process.env['FIREBASE_DATABASE_URL'],
    });

    firebase.firestore().settings({ ignoreUndefinedProperties: true });
    return app;
  } catch (error) {
    throw new Error(`Firebase initialization failed. ${error}`);
  }
}

export function firestore(): FirebaseFirestore.Firestore {
  return admin().firestore();
}

export function auth(): firebase.auth.Auth {
  return admin().auth();
}

export function pubsub() {
  const credentials = {
    projectId: process.env['FIREBASE_PROJECT_ID'],
    credentials: {
      private_key: process.env['FIREBASE_PRIVATE_KEY'],
      client_email: process.env['FIREBASE_CLIENT_EMAIL'],
      client_id: process.env['FIREBASE_CLIENT_ID'],
    },
  };

  const client = new PS(credentials);
  return client;
}
