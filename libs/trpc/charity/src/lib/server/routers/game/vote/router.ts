import { t } from '../../../trpc';

import cast from './cast';
import get from './get';

export default t.router({
  cast,
  get,
});
