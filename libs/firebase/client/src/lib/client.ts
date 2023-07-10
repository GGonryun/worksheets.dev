import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  initializeApp,
  getApps,
  FirebaseApp,
  FirebaseError,
} from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, connectAuthEmulator } from '@firebase/auth';

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

export class FirebaseFailure extends FirebaseError {}
type CreateFirebaseAppFuncton = () => FirebaseApp;

const createFirebaseApp: CreateFirebaseAppFuncton = () => {
  if (getApps().length <= 0) {
    return initializeApp(clientCredentials);
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

if (process.env['NEXT_PUBLIC_FIREBASE_EMULATORS_ONLINE']) {
  console.info('connected to emulators');
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
  connectFirestoreEmulator(firestoreDb, 'localhost', 8080);
  connectDatabaseEmulator(realtimeDb, 'localhost', 9000);
}
