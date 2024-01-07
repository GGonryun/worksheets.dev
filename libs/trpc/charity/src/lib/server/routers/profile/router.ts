import { t } from '../../trpc';

import get from './get';
import upsert from './upsert';
import terms from './terms/router';

export default t.router({
  get,
  upsert,
  terms,
});
