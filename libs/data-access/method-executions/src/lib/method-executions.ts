import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import type { MethodExecutionEntity } from '@worksheets/schemas-executions';

export type MethodExecutionDatabase = FirestoreDatabase<MethodExecutionEntity>;

export const newMethodExecutionsDatabase = (txn?: Txn) =>
  newFirestore<MethodExecutionEntity>('methodexecutions', txn);
