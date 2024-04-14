import { t } from '../../../trpc';
import find from './find';
import list from './list';
import participants from './participants';

export default t.router({
  find,
  list,
  participants,
});
