import { t } from '../../../trpc';
import find from './find';
import list from './list';

export default t.router({
  find,
  list,
});
