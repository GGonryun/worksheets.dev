import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import {
  shareGameIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { FC } from 'react';

export const ShareGameModal: FC<
  ModalWrapper<{
    id: string;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const gameUrl = `${CHARITY_GAMES_BASE_URL}/play/${id}`;

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
            Share this game
          </Typography>
          <SocialButtonsWrapper title={name} id={id} />
          <Box mt={1} mb={3}>
            <ClipboardText label="Game URL" text={gameUrl} />
          </Box>
          <Button variant="arcade" size="small" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

const SocialButtonsWrapper: FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const intent = shareGameIntent({ title, id });

  return (
    <SocialButtons
      twitter={intent.twitter}
      facebook={intent.facebook}
      reddit={intent.reddit}
    />
  );
};
