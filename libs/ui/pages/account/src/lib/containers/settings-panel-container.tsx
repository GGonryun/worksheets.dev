import { trpc } from '@worksheets/trpc-charity';
import { Snackbar } from '@worksheets/ui/components/snackbar';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { useBookmark } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import {
  BasicInformationFormContextProvider,
  ClearStorageModal,
  DeleteAccountModal,
  SettingsPanel,
} from '../components';
import { useBasicInformationForm } from '../hooks';

export const SettingsPanelContainer: React.FC = () => {
  const bookmark = useBookmark<SettingsPanels>();
  const session = useSession();
  const [showClearStorageModal, setShowClearStorageModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const profile = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
    retry: false,
  });

  const { form, snackbar } = useBasicInformationForm(profile.data);

  const handleClearLocalStorage = () => {
    // clear local storage
    if (localStorage) {
      localStorage.clear();
      signOut({ callbackUrl: routes.home.path() });
    } else {
      alert('No local storage available to clear');
    }
  };

  const handleDeleteAccount = () => {
    alert("We're working on this feature! Contact us to delete your account.");
  };

  if (profile.isLoading) return <LoadingScreen />;

  if (profile.error) return <ErrorComponent />;

  return (
    <>
      <BasicInformationFormContextProvider value={form}>
        <SettingsPanel
          primaryEmail={profile.data.email}
          bookmark={bookmark}
          onClearLocalStorage={() => setShowClearStorageModal(true)}
          onDeleteAccount={() => setShowDeleteAccountModal(true)}
        />
        <Snackbar
          {...snackbar.props}
          message={'Your profile has been updated!'}
          severity={'success'}
        />
      </BasicInformationFormContextProvider>
      <ClearStorageModal
        open={showClearStorageModal}
        onClear={handleClearLocalStorage}
        onClose={() => setShowClearStorageModal(false)}
      />
      <DeleteAccountModal
        open={showDeleteAccountModal}
        onDelete={handleDeleteAccount}
        onClose={() => setShowDeleteAccountModal(false)}
      />
    </>
  );
};
