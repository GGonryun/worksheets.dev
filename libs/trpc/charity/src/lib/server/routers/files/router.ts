import { t } from '../../trpc';
import prepare from './prepare';
import destroy from './destroy';

export default t.router({
  prepare,
  destroy,
});
