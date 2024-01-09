import { t } from '../../../trpc';
import prepare from './prepare';
import complete from './complete';
import destroy from './destroy';

export default t.router({
  prepare,
  destroy,
  complete,
});
