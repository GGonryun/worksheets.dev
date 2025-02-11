import { t } from '../../../trpc';
import achievements from './achievements/router';
import files from './files/router';
import reward from './reward/router';
import session from './session/router';
import storage from './storage/router';

export default t.router({
  files,
  storage,
  session,
  achievements,
  reward,
});
