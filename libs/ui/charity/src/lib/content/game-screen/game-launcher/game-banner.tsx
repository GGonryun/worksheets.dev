import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import {
  FlagOutlined,
  Fullscreen,
  FullscreenExit,
  OpenInNew,
} from '@mui/icons-material';
import { ResponsiveImage } from '../../../images';
import { GameSchema } from '../../../../types';

export type GameBannerProps = {
  type: GameSchema['file']['type'];
  iconUrl: string;
  developer: string;
  name: string;
  isFullscreen?: boolean;
  onReportBug: () => void;
  onFullscreen?: () => void;
  onRedirect?: () => void;
};

export const GameBanner: FC<GameBannerProps> = ({
  iconUrl,
  name,
  developer,
  type,
  isFullscreen,
  onFullscreen,
  onRedirect,
}) => {
  const handleReportBug = () => {
    console.log('handleReportBug');
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        display: 'flex',
        height: 64,
        boxShadow: (theme) => theme.shadows[2],
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          aspectRatio: '1 / 1',
          padding: 1,
        }}
      >
        <ResponsiveImage
          priority
          alt={`${name} logo`}
          src={iconUrl}
          style={{
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        minWidth={0}
        sx={{
          '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      >
        <Box minWidth={0}>
          <Typography
            variant="h6"
            sx={{
              lineHeight: '1rem',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body3"
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            by {developer}
          </Typography>
        </Box>
        <Box display="flex" px={{ xs: 1, sm: 2 }}>
          <IconButton color="primary" onClick={handleReportBug}>
            <FlagOutlined />
          </IconButton>
          {type === 'iframe' && (
            <IconButton color="primary" onClick={onFullscreen}>
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          )}
          {type === 'redirect' && (
            <IconButton color="primary" onClick={onRedirect}>
              <OpenInNew />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
