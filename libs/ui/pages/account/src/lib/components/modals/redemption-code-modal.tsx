import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { HelpPrizesQuestions } from '@worksheets/util/enums';
import Image from 'next/image';

export const RedemptionCodeModal: React.FC<
  ModalWrapper<{
    prize?: {
      name: string;
      imageUrl: string;
    };
    code: string;
  }>
> = ({ open, onClose, prize, code }) => {
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography variant="h4" color="secondary.main" pt={2}>
        Redeem Your Prize
      </Typography>

      {prize && (
        <Image height={164} width={164} src={prize.imageUrl} alt={prize.name} />
      )}

      <Typography textAlign="center">
        Use the code below to redeem your copy of <b>{prize?.name}</b>.
      </Typography>

      <Box />

      <ClipboardText label="Redemption Code" text={code} />

      <Box />

      <Button
        onClick={() => onClose && onClose({}, 'escapeKeyDown')}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Close
      </Button>
      <Button
        href={routes.help.prizes.path({
          bookmark: HelpPrizesQuestions.HowToClaim,
        })}
      >
        Need Help?
      </Button>
    </BasicModal>
  );
};
