import { Clear, DeleteForever } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal } from '@worksheets/ui-games';
import { FC } from 'react';

export const ClearSelectionsModal: FC<{
  open: boolean;
  onClear: () => void;
  onClose: () => void;
}> = ({ open, onClear, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} maxHeight={250} maxWidth={350}>
      <Flex column centered fullWidth p={1}>
        <Typography variant="h4">Clear Selections</Typography>
        <Divider />
        <Flex column pt={2} gap={3} centered>
          <Typography variant="caption" color="error">
            <i>This will clear your current level progress.</i>
          </Typography>
          <Box>
            <Button
              onClick={onClear}
              variant="outlined"
              startIcon={<DeleteForever />}
            >
              <Typography>Yes</Typography>
            </Button>
          </Box>
          <Box>
            <Button onClick={onClear} variant="contained" endIcon={<Clear />}>
              <Typography>Cancel</Typography>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Modal>
  );
};
