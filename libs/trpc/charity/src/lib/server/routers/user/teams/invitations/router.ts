import { t } from '../../../../trpc';
import accept from './accept';
import create from './create';
import list from './list';
import read from './read';
import reject from './reject';
import revoke from './revoke';

export default t.router({
  list,
  read,
  create,
  accept,
  reject,
  revoke,
});
