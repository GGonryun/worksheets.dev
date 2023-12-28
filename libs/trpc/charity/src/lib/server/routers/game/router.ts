import { t } from '../../trpc';
import play from './play';
import analytics from './analytics';

export default t.router({
  play,
  analytics,
});
