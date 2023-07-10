import { convertApplicationDefinition } from '@worksheets/data-access/applications';
import { ListApplicationsRequest } from '@worksheets/schemas-applications';
import { db } from './util';

export const listApplications = ({
  customizable,
  public: publicallyAvailable,
  enabled,
  gallery,
  external,
}: ListApplicationsRequest) => {
  let all = db.list();

  if (customizable) {
    all = all.filter((app) => Boolean(app.settings));
  }

  if (publicallyAvailable != null) {
    all = all.filter((app) => app.meta.public === publicallyAvailable);
  }

  if (enabled != null) {
    all = all.filter((app) => app.meta.enabled === enabled);
  }

  if (gallery != null) {
    all = all.filter((app) => app.meta.gallery === gallery);
  }

  if (external != null) {
    all = all.filter((app) => app.meta.external === external);
  }

  return all.map(convertApplicationDefinition);
};
