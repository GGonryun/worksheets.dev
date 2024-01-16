import { t } from '../../trpc';
import get from './get';
import profile from './profile/router';
import referrals from './referrals/router';
import rewards from './rewards/router';

export default t.router({
  referrals,
  rewards,
  profile,
  get,
});
