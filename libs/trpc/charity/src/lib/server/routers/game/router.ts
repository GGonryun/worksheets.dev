import { t } from '../../trpc';

import submissions from './submissions/router';
import files from './files/router';

import play from './play';
import analytics from './analytics';
import report from './report';
import vote from './vote';

export default t.router({
  submissions,
  play,
  files,
  analytics,
  report,
  vote,
});
