import { Report, Share } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { SerializableGameSchema } from '@worksheets/util/types';
import { FC } from 'react';

import { SupportedDeviceIcons } from './supported-device-icons';

export const GameDescription: FC<{
  id: string;
  name: string;
  description: string;
  platforms: SerializableGameSchema['platforms'];
  onShare: () => void;
  onReport: () => void;
}> = ({ description, id, name, platforms, onShare, onReport }) => {
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
        ancillary={<SupportedDeviceIcons platforms={platforms} />}
      />
    </Box>
  );
};
