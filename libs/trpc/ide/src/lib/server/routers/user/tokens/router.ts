import { t } from '../../../trpc';

import create from './create';
import list from './list';
import destroy from './delete';
export default t.router({
  create,
  list,
  delete: destroy,
});
