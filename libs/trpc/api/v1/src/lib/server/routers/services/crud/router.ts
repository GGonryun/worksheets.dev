import create from './create';
import read from './read';
import update from './update';
import del from './delete';
import list from './list';
import { t } from '../../../trpc';

export default t.router({
  create,
  read,
  update,
  delete: del,
  list,
});
