import { t } from '../../trpc';
import codes from './codes';
import destroy from './delete';
import game from './game/router';
import gamePlay from './gamePlay/router';
import gameTime from './gameTime/router';
import get from './get';
import initialize from './initialize';
import integrations from './integrations/router';
import leaderboards from './leaderboards/router';
import profile from './profile/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import referrer from './referrer/router';
import tasks from './tasks/router';

export default t.router({
  referrals,
  referrer,
  gamePlay,
  gameTime,
  profile,
  leaderboards,
  get,
  raffles,
  game,
  initialize,
  tasks,
  delete: destroy,
  codes,
  integrations,
});
