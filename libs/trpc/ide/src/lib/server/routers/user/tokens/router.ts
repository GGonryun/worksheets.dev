import { t } from '../../../trpc';

import create from './create';
import list from './list';
import destroy from './delete';
import limit from './limit';

export default t.router({
  create,
  list,
  limit,
  delete: destroy,
});
