import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { ReferralsPanels } from '@worksheets/util/enums';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';

import { ReferralsPanel } from '../panels';

export const ReferralsPanelContainer: React.FC = () => {
  const snackbar = useSnackbar();
  const bookmark = useBookmark<ReferralsPanels>();

  const referrals = trpc.user.referrals.get.useQuery(undefined);
  const referrer = trpc.user.referrer.get.useQuery(undefined);
  const setReferrer = trpc.user.referrer.set.useMutation();

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

  if (referrals.isLoading) return <LoadingScreen />;

  if (referrals.error) return <ErrorComponent />;

  return (
    <ReferralsPanel
      bookmark={bookmark}
      referrals={referrals.data.referrals}
      link={referrals.data.referralLink}
      referrer={referrer.data}
      onReferrerAdd={handleReferrerAdd}
    />
  );
};
