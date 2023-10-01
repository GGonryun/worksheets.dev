import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import {
  NewsletterSubscriptionEntity,
  UserContactEntity,
  UserLimitsEntity,
  UserQuotasEntity,
} from '@worksheets/schemas-user';

export type UserLimitsDatabase = FirestoreDatabase<UserLimitsEntity>;
export type UserQuotaDatabase = FirestoreDatabase<UserQuotasEntity>;
export type UserContactDatabase = FirestoreDatabase<UserContactEntity>;
export type NewsletterSubscriptionDatabase =
  FirestoreDatabase<NewsletterSubscriptionEntity>;

export const newUserLimitsDatabase = (txn?: Txn) =>
  newFirestore<UserLimitsEntity>('userlimits', txn);

export const newUserQuotasDatabase = (txn?: Txn) =>
  newFirestore<UserQuotasEntity>('userquotas', txn);

export const newUserContactDatabase = (txn?: Txn) =>
  newFirestore<UserContactEntity>('usercontact', txn);

export const newNewsletterSubscriptionDatabase = (txn?: Txn) =>
  newFirestore<NewsletterSubscriptionEntity>('newsletter', txn);
