import { t } from '../../../trpc';
import clear from './clear';
import hasAny from './hasAny';
import list from './list';

export default t.router({
  list,
  hasAny,
  clear,
});
