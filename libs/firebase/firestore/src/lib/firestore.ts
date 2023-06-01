import { CodedFailure, CodedFailureOptions } from '@worksheets/util/errors';
import { firestore } from '@worksheets/firebase/server';
import { DocumentData, WhereFilterOp } from 'firebase/firestore';
import { Entity } from './schema';

type DatabaseFailures = 'unknown' | 'not-found' | 'missing-id';
export class DatabaseFailure extends CodedFailure<DatabaseFailures> {
  constructor(opt: CodedFailureOptions<DatabaseFailures>) {
    const { message, ...args } = opt;
    const m = message ?? 'encountered failure';
    super({ ...args, message: `firedb: ${m}` });
  }
}

export type Query<T> = {
  // field
  f: keyof T;
  // operator
  o: WhereFilterOp;
  //value
  v: unknown;
};

export type Txn = FirebaseFirestore.Transaction;

export type Document =
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

export function newFirestore<T extends Entity>(key: string, txn?: Txn) {
  const collection = firestore().collection(key);

  function parse(data: FirebaseFirestore.QuerySnapshot<DocumentData>): T[] {
    const items: T[] = [];
    data.forEach((doc) => {
      const data = doc.data() as T;
      items.push(data);
    });
    return items;
  }

  function transact(newTxn?: Txn) {
    return newFirestore<T>(key, newTxn);
  }

  async function doc(id: string): Promise<Document> {
    const query = collection.doc(id);
    if (txn) {
      return await txn.get(query);
    } else {
      return await query.get();
    }
  }

  function id(): string {
    return collection.doc().id;
  }

  async function has(id: string): Promise<boolean> {
    const document = await doc(id);
    return document.exists;
  }

  async function get(id: string): Promise<T> {
    const document = await doc(id);
    if (!document.exists) {
      throw new DatabaseFailure({
        code: 'not-found',
        message: `document does not exist`,
        data: { key, id },
      });
    }
    return document.data() as T;
  }

  async function query(...queries: Query<T>[]): Promise<T[]> {
    let q: FirebaseFirestore.Query<DocumentData> = firestore().collection(key);
    for (const query of queries) {
      const { f, o, v } = query;
      q = q.where(f as string, o, v);
    }

    let docs;
    if (txn) {
      docs = await txn.get(q);
    } else {
      docs = await q.get();
    }

    return parse(docs);
  }

  async function insert(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = await id();
    }
    const document = firestore().collection(key).doc(entity.id);
    try {
      if (txn) {
        txn.create(document, entity);
      } else {
        await document.create(entity);
      }
    } catch (error) {
      throw new DatabaseFailure({
        code: 'unknown',
        message: `failed to insert entity`,
        cause: error,
        data: { key, entity },
      });
    }

    return entity;
  }

  async function update(entity: T): Promise<T> {
    if (!entity.id) {
      throw new DatabaseFailure({
        code: 'missing-id',
        data: { key, entity },
        message: 'cannot update an entity without an id',
      });
    }
    if (!(await has(entity.id))) {
      throw new DatabaseFailure({
        code: 'not-found',
        data: { key, entity },
        message: "cannot update an entity that doesn't exist",
      });
    }
    const document = firestore().collection(key).doc(entity.id);
    try {
      if (txn) {
        txn.update(document, entity);
      } else {
        await document.update(entity);
      }
    } catch (error) {
      throw new DatabaseFailure({
        code: 'unknown',
        message: `failed to perform update`,
        data: { entity, key },
        cause: error,
      });
    }

    return get(entity.id);
  }

  async function updateOrInsert(entity: T): Promise<T> {
    if (!entity.id || !(await has(entity.id))) {
      return await insert(entity);
    }

    return await update(entity);
  }

  async function list(txn?: Txn): Promise<T[]> {
    try {
      let docs;
      if (txn) {
        docs = await txn.getAll();
      } else {
        docs = await collection.get();
      }
      const items: T[] = [];
      docs.forEach((doc) => {
        const data = doc.data() as T;
        items.push(data);
      });
      return items;
    } catch (error) {
      throw new DatabaseFailure({
        code: 'unknown',
        message: 'failed to list collection contents',
        cause: error,
        data: { key },
      });
    }
  }

  async function del(id: string): Promise<void> {
    if (!id) {
      throw new DatabaseFailure({
        code: 'missing-id',
        data: { key, id },
        message: 'id required to delete a resource',
      });
    }
    const doc = collection.doc(id);
    try {
      if (txn) {
        txn.delete(doc);
      } else {
        await doc.delete();
      }
    } catch (error) {
      throw new DatabaseFailure({
        code: 'unknown',
        data: { key, id },
        message: 'failed to delete resource',
      });
    }
  }

  return {
    collection,
    with: transact,
    id,
    has,
    get,
    query,
    insert,
    update,
    updateOrInsert,
    list,
    delete: del,
    parse,
  };
}

export type FirestoreDatabase<T extends Entity> = ReturnType<
  typeof newFirestore<T>
>;
