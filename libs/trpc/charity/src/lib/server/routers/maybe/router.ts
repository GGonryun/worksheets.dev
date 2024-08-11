import { t } from '../../trpc';
import battles from './battles/router';
import games from './games/router';
import leaderboards from './leaderboards/router';
import prizes from './prizes/router';
import raffles from './raffles';
import user from './user';

// TODO: create different "public" routers that are cached for varying amounts of time.
export default t.router({
  // TODO: split up the battle schema so that damage is a separate entity that is loaded dynamically.
  battles,
  raffles,
  prizes,
  games,
  leaderboards,
  user,
});
