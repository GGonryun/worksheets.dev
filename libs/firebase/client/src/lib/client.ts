import { getAuth, connectAuthEmulator } from '@firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { isSupported } from 'firebase/analytics';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const clientCredentials = {
  apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
  authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
  databaseURL: process.env['NEXT_PUBLIC_FIREBASE_DATABASE_URL'],
  projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
  appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
  measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'],
};

type CreateFirebaseAppFuncton = () => FirebaseApp;
const createFirebaseApp: CreateFirebaseAppFuncton = () => {
  if (getApps().length <= 0) {
    const app = initializeApp(clientCredentials);
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      isSupported().then((supportsAnalytics) => {
        if (
          supportsAnalytics &&
          'measurementId' in clientCredentials &&
          clientCredentials.measurementId
        ) {
          getAnalytics();
        }
      });
    }
    return app;
  }
  return getApps()[0];
};

const firebaseApp = createFirebaseApp();

const createAuth = () => {
  return getAuth(firebaseApp);
};

export const firebaseAuth = createAuth();

export const firestoreDb = getFirestore();

export const realtimeDb = getDatabase();

if (process.env['FIREBASE_EMULATORS_ONLINE']) {
  console.info('connected to emulators');
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
  connectFirestoreEmulator(firestoreDb, 'localhost', 8080);
  connectDatabaseEmulator(realtimeDb, 'localhost', 9000);
}
