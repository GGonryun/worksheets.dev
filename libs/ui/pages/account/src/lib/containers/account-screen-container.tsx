import { getNextUTCMidnight } from '@worksheets/util/time';
import { useRouter } from 'next/router';

import { AccountScreen } from '../components';
import { FriendsPanelContainer } from './friends-panel-container';
import { PrizesPanelContainer } from './prizes-panel-container';
import { ReferralsPanelContainer } from './referrals-panel-container';
import { SettingsPanelContainer } from './settings-panel-container';
import { SubmissionsPanelContainer } from './submission-panel-container';
import { TokensPanelContainer } from './tokens-panel-container';

const AccountScreenContainer: React.FC = () => {
  const { pathname } = useRouter();
  const refreshTimestamp = getNextUTCMidnight().getTime();

  return (
    <AccountScreen
      path={pathname}
      settingsPanel={<SettingsPanelContainer />}
      submissionsPanel={<SubmissionsPanelContainer />}
      friendsPanel={
        <FriendsPanelContainer refreshTimestamp={refreshTimestamp} />
      }
      referralsPanel={
        <ReferralsPanelContainer refreshTimestamp={refreshTimestamp} />
      }
      tokensPanel={<TokensPanelContainer refreshTimestamp={refreshTimestamp} />}
      prizesPanel={<PrizesPanelContainer />}
    />
  );
};

export default AccountScreenContainer;
