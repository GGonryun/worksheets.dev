import { t } from '../../../trpc';
import files from './files/router';
import session from './session/router';
import storage from './storage/router';
import submissions from './submissions/router';

export default t.router({
  files,
  submissions,
  storage,
  session,
});
