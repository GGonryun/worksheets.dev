import { t } from '../../trpc';
import create from './create';
import destroy from './delete';
import get from './get';
import list from './list';
import update from './update';
import table from './table';

export default t.router({
  create,
  delete: destroy,
  list,
  table,
  get,
  update,
});
