import { trpc } from '@worksheets/trpc-charity';
import { Snackbar } from '@worksheets/ui/components/snackbar';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { useBookmark } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { NotificationPreferencesSchema } from '@worksheets/util/types';
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

  const connected = session.status === 'authenticated';
  const profile = trpc.user.get.useQuery(undefined, {
    enabled: connected,
    retry: false,
  });

  const preferences = trpc.user.notifications.preferences.get.useQuery(
    undefined,
    {
      enabled: connected,
      retry: false,
    }
  );

  const upsertPreferences =
    trpc.user.notifications.preferences.upsert.useMutation();

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

  const handleUpdatePreferences = async (
    data: Omit<NotificationPreferencesSchema, 'email'>
  ) => {
    await upsertPreferences.mutateAsync({
      email: data.enabledEmailNotifications,
    });
    await preferences.refetch();
    snackbar.trigger({
      severity: 'success',
      message: 'Your preferences have been updated!',
    });
  };

  if (profile.isLoading || preferences.isLoading) return <LoadingScreen />;

  if (profile.error || preferences.error) return <ErrorComponent />;

  return (
    <>
      <BasicInformationFormContextProvider value={form}>
        <SettingsPanel
          preferences={preferences.data}
          bookmark={bookmark}
          onUpdatePreferences={handleUpdatePreferences}
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
