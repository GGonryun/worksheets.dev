import { t } from '../../trpc';
import create from './create';
import list from './list';

export default t.router({
  create,
  list,
});
