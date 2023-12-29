import { FC } from 'react';
import { BaseModal, ModalWrapper } from '../base/base-modal';
import { SerializableGameSchema } from '@worksheets/util/types';
import { SocialButtons } from './social-buttons';
import { ClipboardText } from './clipboard-text';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';

export const ShareGameModal: FC<
  ModalWrapper<{
    game: SerializableGameSchema;
  }>
> = ({ game, open, onClose }) => {
  const gameUrl = `https://www.charity.games/play/${game.id}`;
  const gameTitle = `Play ${game.name} on Charity.Games and earn money for charity!`;

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
          <Typography variant="h5" fontSize={{ xs: '2rem', sm: '2.5rem' }}>
            Share this game
          </Typography>
          <SocialButtons title={gameTitle} url={gameUrl} />
          <Box mt={1} mb={3}>
            <ClipboardText url={gameUrl} />
          </Box>
          <CustomButton onClick={handleClose}>Okay</CustomButton>
        </Box>
      </Box>
    </BaseModal>
  );
};

const CustomButton: FC<Omit<ButtonProps, 'sx'>> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      {...props}
      sx={{
        mt: 2,
        mr: { xs: 0, sm: -2 },
        borderRadius: 6,
        alignSelf: 'flex-end',
        width: { xs: '100%', sm: 'fit-content' },
        fontFamily: (theme) => theme.typography.body1.fontFamily,
        textTransform: 'none',
        fontWeight: 700,
      }}
    >
      Okay
    </Button>
  );
};
