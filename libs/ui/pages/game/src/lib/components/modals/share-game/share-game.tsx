import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  shareGame,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { FC } from 'react';

import { ClipboardText } from './clipboard-text';

export const ShareGameModal: FC<
  ModalWrapper<{
    id: string;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const gameUrl = `https://charity.games/play/${id}`;
  const gameTitle = `Play ${name} on Charity.Games and earn money for charity!`;

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
          <SocialButtonsWrapper title={gameTitle} url={gameUrl} />
          <Box mt={1} mb={3}>
            <ClipboardText url={gameUrl} />
          </Box>
          <Button variant="arcade" size="small" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

const SocialButtonsWrapper: FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const encodedProps = {
    title: encodeURIComponent(title),
    url: encodeURIComponent(url),
  };

  return (
    <SocialButtons
      twitter={shareGame.twitter(encodedProps)}
      facebook={shareGame.facebook(encodedProps)}
      reddit={shareGame.reddit(encodedProps)}
    />
  );
};
