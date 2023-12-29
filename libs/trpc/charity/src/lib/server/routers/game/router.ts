import { t } from '../../trpc';
import play from './play';
import analytics from './analytics';
import report from './report';
import vote from './vote';

export default t.router({
  play,
  analytics,
  report,
  vote,
});
