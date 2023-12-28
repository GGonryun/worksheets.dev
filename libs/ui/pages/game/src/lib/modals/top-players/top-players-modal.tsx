import { Box, Button, IconButton, Typography } from '@mui/material';
import { BaseModal, ModalWrapper } from '../base/base-modal';
import { FC } from 'react';
import { GamePlayerSchema } from '@worksheets/util/types';
import {
  NoPlayersPlaceholder,
  TopPlayersList,
} from '../../game-description/top-players';
import CloseIcon from '@mui/icons-material/Close';

export const TopPlayersModal: FC<
  ModalWrapper<{
    players: GamePlayerSchema[];
  }>
> = ({ players, open, onClose }) => {
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
        <Box display="flex" flexDirection="column" py={2} px={4} mt={-3}>
          <Typography variant="h4">Top Players</Typography>
          {players.length ? (
            <TopPlayersList players={players} />
          ) : (
            <Box mb={3}>
              <NoPlayersPlaceholder />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClose}
            sx={{
              mt: 2,
              mr: -2,
              borderRadius: 6,
              alignSelf: 'flex-end',
              width: 'fit-content',
              fontFamily: (theme) => theme.typography.body1.fontFamily,
              textTransform: 'none',
            }}
          >
            Okay
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};
