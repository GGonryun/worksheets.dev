import { t } from '../../../../trpc';
import create from './create';
import list from './list';
import statistics from './statistics';

export default t.router({
  list,
  statistics,
  create,
});
