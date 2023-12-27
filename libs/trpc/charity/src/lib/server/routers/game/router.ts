import { t } from '../../trpc';
import vote from './vote';
import play from './play';

export default t.router({
  vote,
  play,
});
