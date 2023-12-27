import { t } from '../../../trpc';
import add from './add';
import remove from './remove';

export default t.router({
  add,
  remove,
});
