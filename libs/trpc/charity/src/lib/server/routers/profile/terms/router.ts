import { t } from '../../../trpc';

import approve from './approve';
import get from './get';

export default t.router({
  approve,
  get,
});
