import { t } from '../../trpc';
// routers
import connections from './connections/router';
import logs from './logs/router';
import tasks from './tasks/router';
// actions
import create from './create';
import destroy from './delete';
import get from './get';
import list from './list';
import update from './update';
import table from './table';

export default t.router({
  connections,
  tasks,
  logs,
  create,
  delete: destroy,
  list,
  table,
  get,
  update,
});
