import { t } from '../../trpc';
import codes from './codes';
import destroy from './delete';
import followers from './followers';
import friends from './friends/router';
import game from './game/router';
import gamePlay from './gamePlay/router';
import gameTime from './gameTime/router';
import get from './get';
import initialize from './initialize';
import integrations from './integrations/router';
import inventory from './inventory';
import leaderboards from './leaderboards/router';
import newsletter from './newsletter/router';
import notifications from './notifications/router';
import profile from './profile/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import referrer from './referrer/router';
import tasks from './tasks/router';
import vip from './vip/router';

export default t.router({
  referrals,
  referrer,
  gamePlay,
  gameTime,
  notifications,
  profile,
  leaderboards,
  get,
  friends,
  followers,
  raffles,
  game,
  vip,
  initialize,
  newsletter,
  tasks,
  inventory,
  delete: destroy,
  codes,
  integrations,
});
