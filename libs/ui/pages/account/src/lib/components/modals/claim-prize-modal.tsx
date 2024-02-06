import { Alarm } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { ModalWrapper } from '@worksheets/ui-core';
import {
  durationToString,
  millisecondsAsDuration,
  printShortDateTime,
} from '@worksheets/util/time';
import { WonPrizeDetails } from '@worksheets/util/types';
import Image from 'next/image';

import { ParentModal } from './parent-modal';

export const ClaimPrizeModal: React.FC<
  ModalWrapper<{ prize?: WonPrizeDetails; onClaim: () => void }>
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
        Claim your prize before{' '}
        {prize ? printShortDateTime(prize.claimBy) : '??'}.
        <br />
        If you don't claim it by then, it will expire.
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Alarm />
        <Typography textAlign="center" fontWeight={700}>
          Expires in{' '}
          {prize
            ? durationToString(
                millisecondsAsDuration(prize.claimBy - Date.now())
              )
            : '??'}
        </Typography>
      </Box>

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
