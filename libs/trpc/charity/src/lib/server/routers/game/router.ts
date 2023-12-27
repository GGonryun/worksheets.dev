import { t } from '../../trpc';
import vote from './vote';
import play from './play';
import analytics from './analytics';

export default t.router({
  vote,
  play,
  analytics,
});
