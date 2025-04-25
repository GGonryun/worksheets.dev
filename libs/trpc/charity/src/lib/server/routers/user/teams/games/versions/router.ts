import { t } from '../../../../../trpc';
import create from './create';
import destroy from './destroy';
import list from './list';
import read from './read';
import setCurrent from './set-current';

export default t.router({
  read,
  setCurrent,
  list,
  create,
  delete: destroy,
});
