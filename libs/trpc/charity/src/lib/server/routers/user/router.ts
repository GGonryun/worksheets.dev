import { t } from '../../trpc';
import friends from './friends/router';
import get from './get';
import prizes from './prizes/router';
import profile from './profile/router';
import referrals from './referrals/router';
import rewards from './rewards/router';

export default t.router({
  referrals,
  rewards,
  profile,
  get,
  friends,
  prizes,
});
