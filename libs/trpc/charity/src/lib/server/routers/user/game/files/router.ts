import { t } from '../../../../trpc';
import complete from './complete';
import destroy from './destroy';
import prepare from './prepare';

export default t.router({
  prepare,
  destroy,
  complete,
});
