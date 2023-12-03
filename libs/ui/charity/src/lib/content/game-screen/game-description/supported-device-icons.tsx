import { Laptop, Smartphone } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { GameSchema } from '../../../../types/game-schema';
import { FC } from 'react';

type SupportedDevices = GameSchema['platforms'][number];

export const SupportedDeviceIcons: FC<{ platforms: SupportedDevices[] }> = ({
  platforms,
}) => (
  <Box display="flex" alignItems="center">
    {platforms.includes('desktop') && (
      <IconButton href="/tags/desktop" size="small" disableRipple>
        <Laptop sx={{ fontSize: 20 }} />
      </IconButton>
    )}
    {platforms.includes('mobile') && (
      <IconButton href="/tags/mobile" size="small" disableRipple>
        <Smartphone sx={{ fontSize: 18 }} />
      </IconButton>
    )}
  </Box>
);
