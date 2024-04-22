import { t } from '../../trpc';
import battles from './battles';
import codes from './codes';
import destroy from './delete';
import followers from './followers';
import friends from './friends/router';
import game from './game/router';
import gamePlay from './gamePlay/router';
import gameTime from './gameTime/router';
import get from './get';
import initialize from './initialize';
import inventory from './inventory';
import newsletter from './newsletter/router';
import notifications from './notifications/router';
import profile from './profile/router';
import quests from './quests/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import referrer from './referrer/router';
import vip from './vip/router';

export default t.router({
  referrals,
  referrer,
  gamePlay,
  gameTime,
  notifications,
  profile,
  get,
  friends,
  followers,
  raffles,
  game,
  vip,
  initialize,
  newsletter,
  quests,
  inventory,
  delete: destroy,
  codes,
  battles,
});
