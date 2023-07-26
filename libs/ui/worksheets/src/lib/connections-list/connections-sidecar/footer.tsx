import { Box } from '@mui/material';
import { SupportBox } from './support-box';
import { UninstallBox } from './uninstall-box';

export const Footer: React.FC = () => (
  <Box py={3} display="flex" gap={3} justifyContent="flex-end">
    <SupportBox />
    <UninstallBox />
  </Box>
);
