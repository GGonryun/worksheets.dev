import {
  ListApplicationsRequest,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplications = (
  req: ListApplicationsRequest
): ListApplicationsResponse => {
  const all = db.list();
  if (req.gallery) {
    return all.filter((e) => db.isVisibleInGallery(e.id));
  }
  return all;
};
