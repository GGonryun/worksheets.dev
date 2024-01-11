import { t } from '../../trpc';

// sub-routers
import vote from './vote/router';
import submissions from './submissions/router';
import files from './files/router';
// procedures
import play from './play';
import analytics from './analytics';
import report from './report';

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
