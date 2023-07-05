import { t } from '../../trpc';
import identify from './identify';
import tokens from './tokens/router';
import connections from './connections/router';
import acknowledge from './acknowledge';
import overview from './overview';
import update from './update';

export default t.router({
  identify,
  acknowledge,
  tokens,
  connections,
  overview,
  update,
});
