import {
  FirestoreDatabase,
  Txn,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { ProjectEntity } from '@worksheets/schemas-projects';

export type ProjectsDatabase = FirestoreDatabase<ProjectEntity>;

export const newProjectsDatabase = (txn?: Txn) =>
  newFirestore<ProjectEntity>('projects', txn);
