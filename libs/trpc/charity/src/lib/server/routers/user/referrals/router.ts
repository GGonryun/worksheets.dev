import { t } from '../../../trpc';
import get from './get';
import set from './set';

export default t.router({
  set,
  get,
});
