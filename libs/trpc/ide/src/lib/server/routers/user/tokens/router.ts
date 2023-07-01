import { t } from '../../../trpc';

import create from './create';
import destroy from './delete';
export default t.router({
  create,
  delete: destroy,
});
