import { t } from '../../../../trpc';
import destroy from './delete';
import leave from './leave';
import list from './list';
import read from './read';
import transfer from './transfer';
import update from './update';

export default t.router({
  list,
  read,
  delete: destroy,
  leave,
  update,
  transfer,
});
