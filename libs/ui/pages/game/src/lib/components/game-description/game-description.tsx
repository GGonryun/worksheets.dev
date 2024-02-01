import { Report, Share } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { GameDevices } from '@worksheets/util/types';
import { FC } from 'react';

import { SupportedDeviceIcons } from './supported-device-icons';

export const GameDescription: FC<{
  description: string;
  devices: GameDevices[];
  onShare: () => void;
  onReport: () => void;
}> = ({ description, devices, onShare, onReport }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box mt={2}>
      <Description
        title="About This Game"
        icons={
          <Box display="flex">
            <IconButton color="inherit" onClick={onShare}>
              <Share fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton color="inherit" onClick={onReport}>
              <Report fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        }
        description={description}
        ancillary={<SupportedDeviceIcons devices={devices} />}
      />
    </Box>
  );
};
