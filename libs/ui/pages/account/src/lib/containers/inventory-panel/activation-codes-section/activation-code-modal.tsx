import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { HelpPrizesQuestions } from '@worksheets/util/enums';
import { ActivationCodeDetails } from '@worksheets/util/types';
import Image from 'next/image';

export const ActivationCodeModal: React.FC<
  ModalWrapper<{
    code: ActivationCodeDetails;
  }>
> = ({ open, onClose, code }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  return (
    <BasicModal open={open} onClose={onClose}>
      {code.item.type === 'STEAM_KEY' ? (
        <ActivationCodeContent code={code} onClose={handleClose} />
      ) : (
        <Box>Something went wrong. Contact Support</Box>
      )}
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

const ActivationCodeContent: React.FC<{
  code: ActivationCodeDetails;
  onClose: () => void;
}> = ({ code, onClose }) => {
  return (
    <>
      <Typography variant="h4" color="secondary.main" pt={2}>
        Redeem Your Prize <br />
        on Steam Games
      </Typography>

      {code && (
        <Image
          height={164}
          width={164}
          src={code.item.imageUrl}
          alt={code.item.name}
        />
      )}

      <Typography textAlign="center">
        Use the code below to access your <b>{code.item.name}</b>.
      </Typography>

      <Box my={1} width="100%">
        {code && <ClipboardText label="Activation Code" text={code.content} />}
      </Box>

      <Button
        onClick={onClose}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Close
      </Button>
    </>
  );
};
