import { t } from '../../trpc';
import get from './get';
import terms from './terms/router';
import upsert from './upsert';

export default t.router({
  get,
  upsert,
  terms,
});
