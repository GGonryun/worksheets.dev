import { t } from '../../../trpc';

import get from './get';
import list from './list';
import create from './create';
import submit from './submit';
import update from './update';

export default t.router({
  get,
  create,
  update,
  submit,
  list,
});
