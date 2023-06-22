import { Box, Divider, Drawer, Typography } from '@mui/material';

export const SidecarLayout: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}> = ({ open, onClose, children, title }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box mt={'64px'} width="600px">
      <Box px={3} py={1}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Divider />

      <Box px={3} py={2}>
        {children}
      </Box>
    </Box>
  </Drawer>
);
