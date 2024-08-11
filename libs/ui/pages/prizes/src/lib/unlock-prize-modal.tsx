import { Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { PrizeSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import React from 'react';

import { DealCountdown } from './deal-countdown';
import { PrizeDetails } from './prize-details';
import { PrizeModalActions } from './prize-modal-actions';
import { RegionCheck } from './region-check';

export const UnlockPrizeModal: React.FC<
  ModalWrapper<{ prize: PrizeSchema | null; onUnlock: () => void }>
> = ({ open, onClose, prize, onUnlock }) => {
  const session = useSession();

  if (!prize) {
    return null;
  }

  return (
    <InfoModal
      open={open}
      onClose={onClose}
      color="error"
      background={(theme) =>
        theme.palette.background.marketing.gradients.blue.primary
      }
    >
      <Column
        gap={3}
        p={{ xs: 0, sm: 1, md: 2 }}
        width="100%"
        color={(theme) => theme.palette.text.arcade}
      >
        <Typography typography="h4" fontWeight={900}>
          Unlock Prize
        </Typography>

        <PrizeDetails prize={prize} />

        <Column gap={0.5}>
          <RegionCheck />
          <DealCountdown />
        </Column>
        <PrizeModalActions
          authenticated={session.status === 'authenticated'}
          onClose={() => onClose?.({}, 'escapeKeyDown')}
          onUnlock={onUnlock}
        />
      </Column>
    </InfoModal>
  );
};
