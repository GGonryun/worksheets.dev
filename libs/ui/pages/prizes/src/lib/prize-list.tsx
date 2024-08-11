import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PrizeSchema, PurchaseResultSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import React from 'react';

import { ConfirmUnlockPrizeModal } from './confirm-unlock-prize-modal';
import { PrizeListItem } from './prize-list-item';
import { PrizeListLayout } from './prize-list-layout';
import { PurchaseResultModal } from './purchase-result-modal';
import { UnlockPrizeModal } from './unlock-prize-modal';

export const PrizeList: React.FC<{
  prizes: PrizeSchema[];
}> = ({ prizes }) => {
  const [selected, setSelected] = React.useState<PrizeSchema | null>(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [purchaseResult, setPurchaseResult] =
    React.useState<PurchaseResultSchema | null>(null);

  const snackbar = useSnackbar();
  const session = useSession();
  const purchase = trpc.user.prizes.purchase.useMutation();
  const utils = trpc.useUtils();

  const handlePurchase = async () => {
    if (session.status !== 'authenticated') return;
    if (!selected) return;
    try {
      const result = await purchase.mutateAsync({
        prizeId: selected.id,
      });

      utils.maybe.prizes.list.invalidate();
      utils.maybe.prizes.history.invalidate();

      setConfirmOpen(false);
      setSelected(null);
      setPurchaseResult(result);

      if (result) {
        snackbar.success('Prize unlocked!');
      } else {
        snackbar.error('Failed to unlock prize. Please try again.');
      }
    } catch (error) {
      snackbar.trpcClientError(error);
    }
  };
  return (
    <>
      <PrizeListLayout>
        {prizes.map((prize) => (
          <PrizeListItem
            key={prize.id}
            item={prize}
            onClick={() => {
              setSelected(prize);
            }}
          />
        ))}
      </PrizeListLayout>
      <UnlockPrizeModal
        open={!!selected}
        onClose={() => setSelected(null)}
        onUnlock={() => setConfirmOpen(true)}
        prize={selected}
      />
      <ConfirmUnlockPrizeModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onPurchase={handlePurchase}
        prize={selected}
      />
      <PurchaseResultModal
        open={purchaseResult != null}
        result={purchaseResult}
        onClose={() => {
          setPurchaseResult(null);
        }}
      />
    </>
  );
};
