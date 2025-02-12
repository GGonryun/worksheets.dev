import { t } from '../../trpc';
import games from './games/router';
import leaderboards from './leaderboards/router';
import raffles from './raffles';
import user from './user';

// TODO: create different "public" routers that are cached for varying amounts of time.
export default t.router({
  raffles,
  games,
  leaderboards,
  user,
});
