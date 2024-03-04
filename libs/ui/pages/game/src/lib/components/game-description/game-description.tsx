import { Report, Share } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { HTMLinator } from '@worksheets/ui-core';
import { GameDevices } from '@worksheets/util/types';
import { FC } from 'react';

import { SupportedDeviceIcons } from './supported-device-icons';

export const GameDescription: FC<{
  description: string;
  trailer: string | null;
  devices: GameDevices[];
  onShare: () => void;
  onReport: () => void;
}> = ({ description, trailer, devices, onShare, onReport }) => {
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
        description={<Content description={description} trailer={trailer} />}
        ancillary={<SupportedDeviceIcons devices={devices} />}
      />
    </Box>
  );
};
const Content: React.FC<{ description: string; trailer: string | null }> = ({
  description,
  trailer,
}) => {
  return (
    <Box>
      <HTMLinator text={description} />
      {trailer && <GameplayVideo trailer={trailer} />}
    </Box>
  );
};

const GameplayVideo: React.FC<{ trailer: string }> = ({ trailer }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Gameplay Video
      </Typography>
      <iframe
        style={{ border: 'none' }}
        width="560"
        height="315"
        src={trailer}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </Box>
  );
};
