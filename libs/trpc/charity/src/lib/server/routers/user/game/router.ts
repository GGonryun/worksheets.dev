import { t } from '../../../trpc';
import achievements from './achievements/router';
import session from './session/router';
import storage from './storage/router';

export default t.router({
  storage,
  session,
  achievements,
});
