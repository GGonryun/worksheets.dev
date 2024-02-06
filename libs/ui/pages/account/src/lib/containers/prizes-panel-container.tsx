import { trpc } from '@worksheets/trpc-charity';
import { useBookmark } from '@worksheets/ui-core';
import { PrizesPanels } from '@worksheets/util/enums';
import { WonPrizeDetails } from '@worksheets/util/types';
import { useState } from 'react';

import { ClaimPrizeModal } from '../components/modals/claim-prize-modal';
import { RedemptionCodeModal } from '../components/modals/redemption-code-modal';
import { PrizesPanel } from '../components/prizes-panel/prizes-panel';

export const PrizesPanelContainer = () => {
  const bookmark = useBookmark<PrizesPanels>();

  const [openClaimPrizeModal, setOpenClaimPrizeModal] = useState(false);
  const [showRedemptionCodeModal, setShowRedemptionCodeModal] = useState(false);

  const [claiming, setClaiming] = useState<WonPrizeDetails | undefined>(
    undefined
  );
  const [code, setCode] = useState('');

  const { data: enteredRaffles } = trpc.user.prizes.entered.useQuery({
    filter: 'all',
  });

  const { data: wonPrizes } = trpc.user.prizes.won.useQuery(undefined);

  const claimPrize = trpc.user.prizes.claim.useMutation();

  const handleStartClaim = async (prize: WonPrizeDetails) => {
    setClaiming(prize);

    if (prize.claimedAt) {
      await handleClaimPrize();
    } else {
      setOpenClaimPrizeModal(true);
    }
  };

  const handleClaimPrize = async () => {
    if (!claiming) {
      return;
    }

    const claimed = await claimPrize.mutateAsync({
      prizeId: claiming.id,
    });

    setCode(claimed.code);
    setShowRedemptionCodeModal(true);
  };

  return (
    <>
      <PrizesPanel
        bookmark={bookmark}
        previous={enteredRaffles ?? []}
        prizes={wonPrizes ?? []}
        onClaim={handleStartClaim}
      />
      <ClaimPrizeModal
        open={openClaimPrizeModal}
        onClose={() => {
          setClaiming(undefined);
          setOpenClaimPrizeModal(false);
        }}
        prize={claiming}
        onClaim={async () => {
          await handleClaimPrize();
          setOpenClaimPrizeModal(false);
        }}
      />
      <RedemptionCodeModal
        open={showRedemptionCodeModal}
        onClose={() => {
          setCode('');
          setShowRedemptionCodeModal(false);
        }}
        prize={claiming}
        code={code}
      />
    </>
  );
};
