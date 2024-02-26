import { trpc } from '@worksheets/trpc-charity';
import { Snackbar } from '@worksheets/ui/components/snackbar';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { useBookmark } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { UpdateNotificationPreferences } from '@worksheets/util/types';
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
  const [updatingPreferences, setUpdatingPreferences] = useState(false);
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
      signOut({ callbackUrl: routes.games.path() });
    } else {
      alert('No local storage available to clear');
    }
  };

  const handleDeleteAccount = () => {
    alert("We're working on this feature! Contact us to delete your account.");
  };

  const handleUpdatePreferences = async (
    data: UpdateNotificationPreferences
  ) => {
    try {
      setUpdatingPreferences(true);

      await upsertPreferences.mutateAsync({
        email: data.enabledEmailNotifications,
      });

      await preferences.refetch();

      snackbar.trigger({
        severity: 'success',
        message: 'Your preferences have been updated!',
      });
    } catch (error) {
      snackbar.trigger({
        severity: 'error',
        message:
          'There was an error updating your preferences. Please try again.',
      });
    } finally {
      setUpdatingPreferences(false);
    }
  };

  if (profile.isLoading || preferences.isLoading) return <LoadingScreen />;

  if (profile.error || preferences.error) return <ErrorComponent />;

  return (
    <>
      <BasicInformationFormContextProvider value={form}>
        <SettingsPanel
          preferences={preferences.data}
          bookmark={bookmark}
          updatingPreferences={updatingPreferences}
          onUpdatePreferences={handleUpdatePreferences}
          onClearLocalStorage={() => setShowClearStorageModal(true)}
          onDeleteAccount={() => setShowDeleteAccountModal(true)}
        />
        <Snackbar {...snackbar.props} />
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
