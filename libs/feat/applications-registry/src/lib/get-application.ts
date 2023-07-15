import { db } from './util';

export const getApplication = (applicationId: string) => {
  return db.getApp(applicationId);
};
