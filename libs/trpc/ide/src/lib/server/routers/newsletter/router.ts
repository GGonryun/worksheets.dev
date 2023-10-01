import { t } from '../../trpc';
import subscribe from './subscribe';
import unsubscribe from './unsubscribe';

export default t.router({
  subscribe,
  unsubscribe,
});
