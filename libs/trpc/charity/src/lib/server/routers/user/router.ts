import { t } from '../../trpc';
import friends from './friends/router';
import game from './game/router';
import get from './get';
import newsletter from './newsletter/router';
import notifications from './notifications/router';
import profile from './profile/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import rewards from './rewards/router';
import vip from './vip/router';

export default t.router({
  referrals,
  rewards,
  notifications,
  newsletter,
  profile,
  get,
  friends,
  raffles,
  game,
  vip,
});
