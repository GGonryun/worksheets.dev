import { Box, Divider, Drawer, Typography } from '@mui/material';
import { ConnectionBuilderSteps } from './connection-builder-steps';

export const ConnectionBuilderSidecar: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box mt={'64px'} width="600px">
      <Box px={3} py={1}>
        <Typography variant="h6">Create a new connection</Typography>
      </Box>
      <Divider />

      <Box px={3} py={2}>
        <ConnectionBuilderSteps
          onConnect={() => {
            alert('TODO: Create connection');
            onClose();
          }}
        />
      </Box>
    </Box>
  </Drawer>
);
