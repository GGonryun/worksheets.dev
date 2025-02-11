import { Report, Share } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
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
  return (
    <Box mt={2}>
      <Description
        title="About This Game"
        icons={
          <Box display="flex" gap={1}>
            <Button
              variant="square"
              size="small"
              color="secondary"
              onClick={onShare}
            >
              <Share fontSize={'small'} />
            </Button>
            <Button
              variant="square"
              size="small"
              color="warning"
              onClick={onReport}
            >
              <Report fontSize={'small'} />
            </Button>
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
      <HTMLinator
        text={description}
        sx={{ color: (theme) => theme.palette.text.arcade }}
      />
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
