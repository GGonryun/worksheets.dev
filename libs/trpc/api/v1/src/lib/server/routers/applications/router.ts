import { t } from '../../trpc';

//actions
import get from './get';
import list from './list';

export default t.router({
  list,
  get,
});
