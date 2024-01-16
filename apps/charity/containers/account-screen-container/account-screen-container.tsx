import { AccountScreen } from '@worksheets/ui/pages/account';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { FriendsPanelContainer } from './friends-panel-container';
import { ProfilePanelContainer } from './profile-panel-container';
import { ReferralsPanelContainer } from './referrals-panel-container';
import { SubmissionsPanelContainer } from './submission-panel-container';
import { TokensPanelContainer } from './tokens-panel-container';

export const AccountScreenContainer: React.FC = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const { asPath } = useRouter();

  return (
    <AccountScreen
      path={asPath}
      onLogout={handleLogout}
      profilePanel={<ProfilePanelContainer />}
      submissionsPanel={<SubmissionsPanelContainer />}
      friendsPanel={<FriendsPanelContainer />}
      referralsPanel={<ReferralsPanelContainer />}
      tokensPanel={<TokensPanelContainer />}
    />
  );
};
