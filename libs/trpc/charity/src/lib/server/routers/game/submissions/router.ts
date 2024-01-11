import { t } from '../../../trpc';

import get from './get';
import list from './list';
import create from './create';
import submit from './submit';
import update from './update';
import destroy from './destroy';

export default t.router({
  get,
  create,
  update,
  submit,
  list,
  destroy,
});
