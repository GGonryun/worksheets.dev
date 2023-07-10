import { t } from '../../../trpc';
import list from './list';
import execute from './execute';

export default t.router({
  list,
  execute,
});
