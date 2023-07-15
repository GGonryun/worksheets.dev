import { t } from '../../../trpc';

import destroy from './delete';
import list from './list';

export default t.router({
  list,
  delete: destroy,
});
