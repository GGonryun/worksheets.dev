import { ListApplicationMethodsResponse } from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplicationMethods = (
  appId: string
): ListApplicationMethodsResponse => {
  return db.getMethods(appId);
};
