import { Laptop, Smartphone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { GameDevices } from '@worksheets/util/types';
import { FC } from 'react';

export const SupportedDeviceIcons: FC<{ devices: GameDevices[] }> = ({
  devices,
}) => (
  <Box display="flex" alignItems="center" gap={2}>
    {devices.includes('COMPUTER') && <Laptop />}
    {devices.includes('MOBILE') && <Smartphone />}
  </Box>
);
