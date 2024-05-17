import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { DynamicUserSubscriptionForm } from '@worksheets/ui/components/newsletter';
import { IS_DEVELOPMENT } from '@worksheets/ui/env';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { destroyAllData } from '@worksheets/util/storage';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { ClearStorageModal, DeleteAccountModal } from '../components';
import { useBasicInformationForm } from '../hooks';
import { BasicInformationFormContextProvider, SettingsPanel } from '../panels';

export const SettingsPanelContainer: React.FC = () => {
  const bookmark = useBookmark<SettingsPanels>();
  const session = useSession();
  const [showClearStorageModal, setShowClearStorageModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const profile = trpc.user.get.useQuery(undefined, {
    retry: false,
    enabled: session.status === 'authenticated',
  });

  const destroy = trpc.user.delete.useMutation();

  const { form } = useBasicInformationForm(profile.data);

  const handleClearLocalStorage = () => {
    destroyAllData();
    signOut({ callbackUrl: routes.play.path() });
  };

  const handleDeleteAccount = async () => {
    if (IS_DEVELOPMENT) {
      await destroy.mutateAsync();
      alert('Account deleted successfully in development mode.');
    } else {
      alert(
        "Your account has been disabled. If you'd like to re-enable it, simply log in again. If you'd like to delete your account, please contact support."
      );
    }
    handleClearLocalStorage();
  };

  if (profile.isLoading) return <LoadingScreen />;

  if (profile.isError) return <ErrorComponent />;

  return (
    <>
      <BasicInformationFormContextProvider value={form}>
        <SettingsPanel
          bookmark={bookmark}
          form={<DynamicUserSubscriptionForm />}
          onClearLocalStorage={() => setShowClearStorageModal(true)}
          onDeleteAccount={() => setShowDeleteAccountModal(true)}
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
