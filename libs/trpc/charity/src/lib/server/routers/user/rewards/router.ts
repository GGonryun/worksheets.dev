import { t } from '../../../trpc';
import create from './create';
import get from './get';

export default t.router({
  create,
  get,
});
