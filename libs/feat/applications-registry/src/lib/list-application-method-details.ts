import { ListApplicationMethodDetailsResponse } from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplicationMethodDetails = (
  appId: string
): ListApplicationMethodDetailsResponse => {
  return db.listApplicationMethodDetails(appId);
};
