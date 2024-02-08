import { t } from '../../trpc';
import find from './find';
import list from './list';
import suggestions from './suggestions';

export default t.router({
  find,
  list,
  suggestions,
});
