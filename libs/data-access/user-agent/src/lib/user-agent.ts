import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { UserLimitsEntity, UserQuotasEntity } from '@worksheets/schemas-user';

export type UserLimitsDatabase = FirestoreDatabase<UserLimitsEntity>;
export type UserQuotaDatabase = FirestoreDatabase<UserQuotasEntity>;

export const newUserLimitsDatabase = (txn?: Txn) =>
  newFirestore<UserLimitsEntity>('userlimits', txn);

export const newUserQuotasDatabase = (txn?: Txn) =>
  newFirestore<UserQuotasEntity>('userquotas', txn);
