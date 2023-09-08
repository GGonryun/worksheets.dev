import { t } from '../../trpc';
import create from './create';
import update from './update';
import read from './read';
import del from './delete';

export default t.router({
  create,
  update,
  read,
  delete: del,
});
