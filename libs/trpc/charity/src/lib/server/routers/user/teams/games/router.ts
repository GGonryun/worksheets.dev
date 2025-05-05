import { t } from '../../../../trpc';
import check from './check';
import create from './create';
import destroy from './destroy';
import details from './details/router';
import list from './list';
import media from './media/router';
import read from './read';
import statistics from './statistics';
import status from './status/router';
import versions from './versions/router';
import visibility from './visibility/router';

export default t.router({
  list,
  read,
  statistics,
  create,
  check,
  details,
  delete: destroy,
  media,
  versions,
  status,
  visibility,
});
