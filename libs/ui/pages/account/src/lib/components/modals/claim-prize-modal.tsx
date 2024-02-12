import { Button, Typography } from '@mui/material';
import { ModalWrapper } from '@worksheets/ui-core';
import { WonRaffleDetails } from '@worksheets/util/types';
import Image from 'next/image';

import { ParentModal } from './parent-modal';

export const ClaimPrizeModal: React.FC<
  ModalWrapper<{ prize?: WonRaffleDetails; onClaim: () => void }>
> = ({ open, onClose, prize, onClaim }) => {
  return (
    <ParentModal open={open} onClose={onClose}>
      <Typography variant="h4" color="success.main" pt={2}>
        Congratulations!
      </Typography>

      <Typography textAlign="center">
        You've earned won a copy of {prize?.name ?? '??'}.
      </Typography>

      {prize && (
        <Image height={150} width={150} src={prize.imageUrl} alt={prize.name} />
      )}
      <Typography textAlign="center">
        Claim your prize and access the activation code!
      </Typography>

      <Button
        onClick={onClaim}
        fullWidth
        variant="arcade"
        size="large"
        color="success"
      >
        Claim
      </Button>
    </ParentModal>
  );
};
