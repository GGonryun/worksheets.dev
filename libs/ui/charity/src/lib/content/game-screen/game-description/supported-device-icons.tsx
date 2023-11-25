import { Laptop, Smartphone } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC } from 'react';
import { SupportedDevices } from '../../../util';

export const SupportedDeviceIcons: FC<{ platforms: SupportedDevices[] }> = ({
  platforms,
}) => (
  <Box display="flex" alignItems="center">
    {platforms.includes('desktop') && (
      <IconButton href="/c/desktop" size="small" disableRipple>
        <Laptop sx={{ fontSize: 20 }} />
      </IconButton>
    )}
    {platforms.includes('mobile') && (
      <IconButton href="/c/mobile" size="small" disableRipple>
        <Smartphone sx={{ fontSize: 18 }} />
      </IconButton>
    )}
  </Box>
);
