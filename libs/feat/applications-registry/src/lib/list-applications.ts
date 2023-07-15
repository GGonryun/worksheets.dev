import { ListApplicationsResponse } from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplications = (): ListApplicationsResponse => {
  const all = db.list();
  // TODO: use the filters to filter the list of applications

  return all;
};
