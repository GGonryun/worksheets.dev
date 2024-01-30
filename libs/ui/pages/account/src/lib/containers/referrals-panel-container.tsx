import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { ReferralsPanels } from '@worksheets/util/enums';
import { MAX_TOKENS_FROM_REFERRAL_PLAYS } from '@worksheets/util/settings';
import { useSession } from 'next-auth/react';

import { ReferralsPanel } from '../components';

export const ReferralsPanelContainer: React.FC<{
  refreshTimestamp: number;
}> = ({ refreshTimestamp }) => {
  const bookmark = useBookmark<ReferralsPanels>();

  const session = useSession();
  const enabled = session.data?.user?.id !== undefined;

  const referrals = trpc.user.referrals.get.useQuery(undefined, {
    enabled,
  });

  if (referrals.isLoading) return <LoadingScreen />;

  if (referrals.error) return <ErrorComponent />;

  return (
    <ReferralsPanel
      bookmark={bookmark}
      referrals={referrals.data.referrals}
      link={referrals.data.referralLink}
      refreshTimestamp={refreshTimestamp}
      gamesPlayed={
        MAX_TOKENS_FROM_REFERRAL_PLAYS - referrals.data.availableReferralTokens
      }
    />
  );
};
