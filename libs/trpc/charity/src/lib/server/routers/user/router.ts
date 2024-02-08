import { t } from '../../trpc';
import friends from './friends/router';
import get from './get';
import profile from './profile/router';
import raffles from './raffles/router';
import referrals from './referrals/router';
import rewards from './rewards/router';

export default t.router({
  referrals,
  rewards,
  profile,
  get,
  friends,
  raffles,
});
