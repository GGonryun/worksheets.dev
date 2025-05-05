import { t } from '../../../trpc';
import find from './find';
import games from './games/router';
import list from './list';

export default t.router({
  find,
  list,
  games,
});
