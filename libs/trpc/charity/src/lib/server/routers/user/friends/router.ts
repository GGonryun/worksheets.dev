import { t } from '../../../trpc';
import add from './add';
import favorite from './favorite';
import find from './find';
import list from './list';
import remove from './remove';

export default t.router({
  add,
  favorite,
  find,
  list,
  remove,
});
