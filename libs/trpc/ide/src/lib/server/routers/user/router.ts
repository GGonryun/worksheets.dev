import { t } from '../../trpc';
import tokens from './tokens/router';
import connections from './connections/router';
import acknowledge from './acknowledge';
import overview from './overview';
import update from './update';

export default t.router({
  acknowledge,
  tokens,
  connections,
  overview,
  update,
});
