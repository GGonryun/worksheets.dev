import { FC } from 'react';
import { Modal, ModalHeader } from './Modal';
import { Flex } from '@worksheets/ui-core';
import { Button, Divider, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { UPDATE_BONUS } from '../constants';

export const UpdateVersionModal: FC<{
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}> = ({ open, onClose, onUpdate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column centered grow p={2}>
        <ModalHeader onClose={onClose}>Update Available</ModalHeader>
        <Divider sx={{ backgroundColor: 'error.dark', width: '100%', mb: 1 }} />
        <Typography variant="body1">
          A new version of the game is available. Press the refresh button to
          update.
        </Typography>
        <br />
        <Typography color="error">
          <i>If you ignore this message, the game may not work correctly.</i>
        </Typography>
        <br />
        <Typography variant="body1">
          You may lose your current level&apos;s progress, but you will receive{' '}
          {UPDATE_BONUS} points as compensation.
        </Typography>
        <br />
        <Flex fill alignItems="flex-end">
          <Button
            size="small"
            variant="contained"
            fullWidth
            sx={{ my: 2, fontFamily: 'sans-serif' }}
            startIcon={<Refresh />}
            onClick={onUpdate}
          >
            Update (+{UPDATE_BONUS} points)
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
