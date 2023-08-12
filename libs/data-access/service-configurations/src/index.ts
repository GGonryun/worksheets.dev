import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { ServiceConfigurationEntity } from '@worksheets/schemas-services';

export type ServiceConfigurationsDatabase =
  FirestoreDatabase<ServiceConfigurationEntity>;
export const newServiceConfigurationsDatabase = (txn?: Txn) =>
  newFirestore<ServiceConfigurationEntity>('serviceconfigurations', txn);
