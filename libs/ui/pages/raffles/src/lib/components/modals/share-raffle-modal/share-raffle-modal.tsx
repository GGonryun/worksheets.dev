import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import {
  shareRaffleIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { FC } from 'react';

export const ShareRaffleModal: FC<
  ModalWrapper<{
    id: number;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const url = `${CHARITY_GAMES_BASE_URL}/raffles/${id}`;

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column">
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ m: 1, alignSelf: 'flex-end' }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          display="flex"
          flexDirection="column"
          py={2}
          width={{ xs: 250, sm: 350 }}
          px={{ xs: 2, sm: 4 }}
          mt={-3}
        >
          <Typography typography={{ xs: 'h6', sm: 'h5' }}>
            Share this Raffle
          </Typography>
          <SocialButtonsWrapper name={name} id={id} />
          <Box mt={1} mb={3}>
            <ClipboardText text={url} />
          </Box>
          <Button variant="arcade" size="small" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

const SocialButtonsWrapper: React.FC<{ name: string; id: number }> = ({
  id,
  name,
}) => {
  const intent = shareRaffleIntent({ name, id });

  return <SocialButtons facebook={intent.facebook} twitter={intent.twitter} />;
};
