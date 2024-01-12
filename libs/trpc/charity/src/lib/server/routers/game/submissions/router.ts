import { t } from '../../../trpc';
import create from './create';
import destroy from './destroy';
import get from './get';
import list from './list';
import submit from './submit';
import update from './update';

export default t.router({
  get,
  create,
  update,
  submit,
  list,
  destroy,
});
