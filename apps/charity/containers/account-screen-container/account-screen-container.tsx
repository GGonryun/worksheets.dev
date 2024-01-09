import { signOut } from 'next-auth/react';
import {
  AccountScreen,
  BasicGameSubmission,
  BasicInformationForm,
} from '@worksheets/ui/pages/account';
import { ProfilePanelContainer } from './profile-panel-container';
import { SubmissionsPanelContainer } from './submission-panel-container';
import { useRouter } from 'next/router';

export const AccountScreenContainer: React.FC<{
  profile: BasicInformationForm | null;
  submissions: BasicGameSubmission[] | null;
}> = ({ profile, submissions }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const { asPath } = useRouter();

  return (
    <AccountScreen
      path={asPath}
      onLogout={handleLogout}
      profilePanel={<ProfilePanelContainer profile={profile} />}
      submissionsPanel={
        <SubmissionsPanelContainer submissions={submissions ?? []} />
      }
    />
  );
};
