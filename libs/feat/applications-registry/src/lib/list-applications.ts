import {
  ListApplicationsRequest,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplications = (
  req: ListApplicationsRequest
): ListApplicationsResponse => {
  const all = db.list();

  let filtered = all;
  if (req.gallery) {
    filtered = all.filter((e) => db.isVisibleInGallery(e.id));
  }

  if (req.featured) {
    filtered = all.filter((e) => db.isFeatured(e.id));
  }

  if (req.features.includes('connections')) {
    filtered = all.filter((e) => db.supportsConnections(e.id));
  }

  return filtered;
};
