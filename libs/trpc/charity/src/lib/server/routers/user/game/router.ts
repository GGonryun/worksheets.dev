import { t } from '../../../trpc';
import files from './files/router';
import submissions from './submissions/router';

export default t.router({
  files,
  submissions,
});
