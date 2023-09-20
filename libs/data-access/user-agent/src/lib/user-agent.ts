import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import {
  UserContactEntity,
  UserLimitsEntity,
  UserQuotasEntity,
} from '@worksheets/schemas-user';

export type UserLimitsDatabase = FirestoreDatabase<UserLimitsEntity>;
export type UserQuotaDatabase = FirestoreDatabase<UserQuotasEntity>;
export type UserContactDatabase = FirestoreDatabase<UserContactEntity>;

export const newUserLimitsDatabase = (txn?: Txn) =>
  newFirestore<UserLimitsEntity>('userlimits', txn);

export const newUserQuotasDatabase = (txn?: Txn) =>
  newFirestore<UserQuotasEntity>('userquotas', txn);

export const newUserContactDatabase = (txn?: Txn) =>
  newFirestore<UserContactEntity>('usercontact', txn);
