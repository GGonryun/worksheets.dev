import { t } from '../../trpc';
import create from './create';
import destroy from './delete';
import get from './get';
import list from './list';
import update from './update';
import table from './table';
import connections from './connections/router';
import logs from './logs/router';

export default t.router({
  create,
  delete: destroy,
  logs,
  list,
  table,
  get,
  update,
  connections,
});
