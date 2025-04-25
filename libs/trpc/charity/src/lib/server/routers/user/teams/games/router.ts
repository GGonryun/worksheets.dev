import { t } from '../../../../trpc';
import create from './create';
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
  details,
  media,
  versions,
  status,
  visibility,
});
