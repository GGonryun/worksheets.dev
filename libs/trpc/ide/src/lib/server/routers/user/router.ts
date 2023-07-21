import { t } from '../../trpc';
import tokens from './tokens/router';
import acknowledge from './acknowledge';
import overview from './overview';
import update from './update';

export default t.router({
  acknowledge,
  tokens,
  overview,
  update,
});
