import { t } from '../../../trpc';
import codes from './codes/router';
import get from './get';
import set from './set';

export default t.router({
  set,
  get,
  codes,
});
