import { t } from '../../trpc';
import analytics from './analytics';
import files from './files/router';
import find from './find';
import play from './play/router';
import recommendations from './recommendations';
import report from './report';
import search from './search';
import submissions from './submissions/router';
import suggestions from './suggestions';
import vote from './vote/router';

export default t.router({
  // sub-routers
  vote,
  submissions,
  files,
  // procedures
  suggestions,
  find,
  play,
  analytics,
  report,
  search,
  recommendations,
});
