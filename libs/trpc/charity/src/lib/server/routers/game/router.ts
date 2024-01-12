import { t } from '../../trpc';
import analytics from './analytics';
import files from './files/router';
// procedures
import play from './play';
import report from './report';
import submissions from './submissions/router';
// sub-routers
import vote from './vote/router';

export default t.router({
  // sub-routers
  vote,
  submissions,
  files,
  // procedures
  play,
  analytics,
  report,
});
