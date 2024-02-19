import { t } from '../../../trpc';
import clear from './clear';
import hasAny from './hasAny';
import list from './list';
import preferences from './preferences';

export default t.router({
  preferences,
  list,
  hasAny,
  clear,
});
