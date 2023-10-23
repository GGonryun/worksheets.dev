import { PlayArrow, Warning } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal } from '@worksheets/ui-games';
import { FC } from 'react';

export const DeviceWarning: FC<{
  open: boolean;
  onClose: (acknowledge: boolean) => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex fill column centered gap={1}>
        <Warning sx={{ fontSize: '100px' }} color="error" />
        <Typography textAlign={'center'} variant="body2" color="error">
          This game is not optimized for your device.
        </Typography>
        <Typography textAlign={'center'}>
          Play on a mobile device for the best experience.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClose(true);
          }}
          endIcon={<PlayArrow />}
          sx={{ mt: 4 }}
        >
          Continue Anyway
        </Button>
      </Flex>
    </Modal>
  );
};
