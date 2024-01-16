import { trpc } from '@worksheets/trpc-charity';
import {
  BasicInformationFormContextProvider,
  ProfilePanel,
} from '@worksheets/ui/pages/account';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { Snackbar } from '@worksheets/ui/snackbar';
import { useSession } from 'next-auth/react';

import { useBasicInformationForm } from './use-basic-information-form';

export const ProfilePanelContainer: React.FC = () => {
  const session = useSession();
  const profile = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
    retry: false,
    refetchOnMount: false,
  });

  const { form, snackbar } = useBasicInformationForm(profile.data);

  if (profile.isLoading) return <LoadingScreen />;

  if (profile.error) return <ErrorComponent />;

  return (
    <BasicInformationFormContextProvider value={form}>
      <ProfilePanel />
      <Snackbar
        {...snackbar}
        message={'Your profile has been updated!'}
        severity={'success'}
      />
    </BasicInformationFormContextProvider>
  );
};
