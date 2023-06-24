import { t } from '../../trpc';
import list from './list';
import get from './get';

export default t.router({
  list,
  get,
});
