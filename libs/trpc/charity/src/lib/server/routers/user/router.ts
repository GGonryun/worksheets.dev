import { t } from '../../trpc';
import destroy from './delete';
import friends from './friends/router';
import game from './game/router';
import get from './get';
import initialize from './initialize';
import newsletter from './newsletter/router';
import notifications from './notifications/router';
import profile from './profile/router';
import quests from './quests/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import referrer from './referrer/router';
import rewards from './rewards/router';
import tokens from './tokens/router';
import vip from './vip/router';

export default t.router({
  referrals,
  referrer,
  rewards,
  notifications,
  profile,
  get,
  friends,
  raffles,
  game,
  vip,
  initialize,
  tokens,
  newsletter,
  quests,
  delete: destroy,
});
