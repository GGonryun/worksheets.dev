import { Link } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Panel } from '@worksheets/ui/components/panels';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { IS_DEVELOPMENT } from '@worksheets/ui/env';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { destroyAllData } from '@worksheets/util/storage';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { ClearStorageModal, DeleteAccountModal } from '../components';
import { useBasicInformationForm } from '../hooks';
import { ActivationCodesSection } from '../panels/inventory-panel/activation-codes-section/activation-code-section';
import { InventoryItemsSection } from '../panels/inventory-panel/inventory-section/inventory-items-section';
import { RaffleParticipationSection } from '../panels/inventory-panel/raffle-participation-section';
import { RedemptionCodesSection } from '../panels/inventory-panel/redemption-codes-section';
import { ReferralsSection } from '../panels/referrals-panel/sections/referrals-section';
import { BasicInformationFormContextProvider } from '../panels/settings-panel/context/provider';
import { DangerZoneSection } from '../panels/settings-panel/sections/danger-zone-section';
import { ProfileSection } from '../panels/settings-panel/sections/profile-section';

export const SettingsPanelContainer: React.FC = () => {
  const bookmark = useBookmark<SettingsPanels>();
  const snackbar = useSnackbar();
  const session = useSession();
  const [showClearStorageModal, setShowClearStorageModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const profile = trpc.user.get.useQuery(undefined, {
    retry: false,
    enabled: session.status === 'authenticated',
  });
  const enteredRaffles = trpc.user.raffles.entered.useQuery({
    activeOnly: false,
  });
  const referrals = trpc.user.referrals.get.useQuery(undefined);
  const referrer = trpc.user.referrer.get.useQuery(undefined);
  const codes = trpc.user.codes.activation.list.useQuery();
  const setReferrer = trpc.user.referrer.set.useMutation();

  const destroy = trpc.user.delete.useMutation();

  const { form } = useBasicInformationForm(profile.data);

  const handleReferrerAdd = async (code: string) => {
    try {
      const newReferrer = await setReferrer.mutateAsync({ code });
      await referrer.refetch();
      snackbar.success(
        `${newReferrer.username} has been set as your referrer.`
      );
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };
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

  if (
    profile.isLoading ||
    referrals.isLoading ||
    enteredRaffles.isLoading ||
    codes.isLoading
  )
    return <LoadingScreen />;

  if (
    profile.isError ||
    referrals.isError ||
    enteredRaffles.isError ||
    codes.isError
  )
    return <ErrorComponent />;

  return (
    <>
      <BasicInformationFormContextProvider value={form}>
        <Panel
          bookmark={bookmark}
          header={{
            primary: 'My Account',
          }}
          note={{
            content: (
              <>
                Help us grow by sharing your{' '}
                <Link href={routes.account.referrals.path()}>
                  referral link
                </Link>{' '}
                with friends and family.
              </>
            ),
          }}
          footer={{
            learn: {
              text: 'Account Settings',
              href: routes.help.accounts.path(),
            },
            action: {
              text: 'Log Out',
              href: routes.logout.path(),
              color: 'error',
            },
          }}
          sections={(active, toggle) => (
            <>
              <ProfileSection active={active} onClick={toggle} />
              <InventoryItemsSection active={active} onClick={toggle} />
              <ActivationCodesSection
                codes={codes.data ?? []}
                active={active}
                onClick={toggle}
              />
              <ReferralsSection
                active={active}
                onClick={toggle}
                referralLink={referrals.data.referralLink}
                numReferrals={referrals.data.referrals.length}
                referrals={referrals.data.referrals}
                referrer={referrer.data ?? null}
                onAddReferrer={handleReferrerAdd}
              />
              <RaffleParticipationSection
                active={active}
                onClick={toggle}
                raffles={enteredRaffles.data ?? []}
              />
              <RedemptionCodesSection active={active} onClick={toggle} />
              <DangerZoneSection
                active={active}
                onClick={toggle}
                onClearLocalStorage={handleClearLocalStorage}
                onDeleteAccount={handleDeleteAccount}
              />
            </>
          )}
        ></Panel>
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
