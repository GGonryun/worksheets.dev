import { CodedFailure, CodedFailureOptions } from '@worksheets/util/errors';
import { firestore } from '@worksheets/firebase/server';
import { DocumentData, WhereFilterOp } from 'firebase/firestore';
import { Entity } from './schema';
import { merge } from 'lodash';
import { PartialBy } from '@worksheets/util/types';

type DatabaseFailures =
  | 'unknown'
  | 'not-found'
  | 'missing-id'
  | 'multiple-results';
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

export type Firestore<T extends Entity> = {
  transact(newTxn?: Txn): Firestore<T>;
  id(): string;
  batch(): FirebaseFirestore.WriteBatch;
  has(id: string): Promise<boolean>;
  get(id: string): Promise<T>;
  query(...queries: Query<T>[]): Promise<T[]>;
  count(...queries: Query<T>[]): Promise<number>;
  hasSome(...queries: Query<T>[]): Promise<boolean>;
  findOne(...queries: Query<T>[]): Promise<T>;
  create(data: T): Promise<T>;
  apply(id: string, data: Partial<Omit<T, 'id'>>): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<void>;
};
export function newFirestore<T extends Entity>(key: string, txn?: Txn) {
  const collection = firestore().collection(key);

  function batch(): FirebaseFirestore.WriteBatch {
    return firestore().batch();
  }

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

  async function hasSome(...queries: Query<T>[]): Promise<boolean> {
    try {
      await findOne(...queries);
      return true;
    } catch (error) {
      if (error instanceof DatabaseFailure && error.code === 'not-found') {
        return false;
      } else if (
        error instanceof DatabaseFailure &&
        error.code === 'multiple-results'
      ) {
        return true;
      }
      throw error;
    }
  }

  async function findOne(...queries: Query<T>[]): Promise<T> {
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

    const results = parse(docs);
    if (results.length === 0) {
      throw new DatabaseFailure({
        code: 'not-found',
        message: `no results found`,
        data: { key, queries },
      });
    } else if (results.length > 1) {
      throw new DatabaseFailure({
        code: 'multiple-results',
        message: `multiple results found`,
        data: { key, queries, results },
      });
    }
    return results[0];
  }

  async function count(...queries: Query<T>[]): Promise<number> {
    let q: FirebaseFirestore.Query<DocumentData> = firestore().collection(key);
    for (const query of queries) {
      const { f, o, v } = query;
      q = q.where(f as string, o, v);
    }

    const c = await q.count().get();

    return c.data().count;
  }

  async function insert(entity: PartialBy<T, 'id'>): Promise<T> {
    if (!entity.id) {
      entity.id = id();
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

    return entity as T;
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

  async function apply(
    id: string,
    updates: Partial<Omit<T, 'id'>>
  ): Promise<T> {
    let data = { id } as T;
    if (await has(id)) {
      data = await get(id);
      return await update(merge(data, updates));
    } else {
      return await insert(merge(data, updates));
    }
  }

  async function updateOrInsert(entity: T): Promise<T> {
    if (!entity.id) {
      return await insert(entity);
    }

    if (!(await has(entity.id))) {
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
    findOne,
    hasSome,
    count,
    insert,
    update,
    updateOrInsert,
    list,
    apply,
    delete: del,
    parse,
    batch,
  };
}

export type FirestoreDatabase<T extends Entity> = ReturnType<
  typeof newFirestore<T>
>;
