import { t } from '../../trpc';
// actions
import create from './create';
import destroy from './delete';
import get from './get';
import list from './list';
import update from './update';
import execute from './execute';

export default t.router({
  create,
  delete: destroy,
  list,
  get,
  update,
  execute,
});
