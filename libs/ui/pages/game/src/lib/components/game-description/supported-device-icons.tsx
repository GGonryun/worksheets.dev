import { Laptop, Smartphone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { GameSchema } from '@worksheets/util/types';
import { FC } from 'react';

type SupportedDevices = GameSchema['platforms'][number];

export const SupportedDeviceIcons: FC<{ platforms: SupportedDevices[] }> = ({
  platforms,
}) => (
  <Box display="flex" alignItems="center" gap={2}>
    {platforms.includes('desktop') && <Laptop />}
    {platforms.includes('mobile') && <Smartphone />}
  </Box>
);
