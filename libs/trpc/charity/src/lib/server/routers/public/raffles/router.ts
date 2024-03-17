import { t } from '../../../trpc';
import find from './find';
import list from './list';
import participants from './participants';
import winners from './winners';

export default t.router({
  find,
  list,
  participants,
  winners,
});
