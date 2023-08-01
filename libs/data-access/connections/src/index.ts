import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';

import {
  ConnectionEntity,
  HandshakeEntity,
} from '@worksheets/schemas-connections';

export type ConnectionDatabase = FirestoreDatabase<ConnectionEntity>;

// TODO: add support for encrypting/decrypting connection fields whenever before they are accessed or saved.
export const newConnectionsDatabase = (txn?: Txn) => {
  const firestoreDb = newFirestore<ConnectionEntity>('appconnections', txn);
  // extending a database with a common access pattern
  const getByApplication = (opts: { appId: string; userId: string }) => {
    return firestoreDb.findOne(
      { f: 'appId', o: '==', v: opts.appId },
      { f: 'userId', o: '==', v: opts.userId }
    );
  };

  // the same as above but returns undefined if not found.
  const queryByApplication = async (opts: {
    appId: string;
    userId: string;
  }) => {
    const result = await firestoreDb.query(
      { f: 'appId', o: '==', v: opts.appId },
      { f: 'userId', o: '==', v: opts.userId }
    );
    if (result.length === 0) {
      return undefined;
    }
    return result[0];
  };

  return { ...firestoreDb, getByApplication, queryByApplication };
};

export type HandshakesDatabase = FirestoreDatabase<HandshakeEntity>;
export const newHandshakesDatabase = (txn?: Txn) =>
  newFirestore<HandshakeEntity>('handshakes', txn);
