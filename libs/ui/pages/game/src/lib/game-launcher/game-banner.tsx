import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { FlagOutlined, Fullscreen, FullscreenExit } from '@mui/icons-material';
import { GameSchema } from '@worksheets/util/types';
import { ResponsiveImage } from '@worksheets/ui/images';

export type GameBannerProps = {
  type: GameSchema['file']['type'];
  iconUrl: string;
  developer: string;
  name: string;
  isFullscreen?: boolean;
  onReportBug: () => void;
  onFullscreen?: () => void;
};

export const GameBanner: FC<GameBannerProps> = ({
  iconUrl,
  name,
  developer,
  type,
  isFullscreen,
  onFullscreen,
}) => {
  const handleReportBug = () => {
    console.log('handleReportBug');
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        display: 'flex',
        height: { xs: '54px', sm: '64px' },
        minHeight: { xs: '54px', sm: '64px' },
        maxHeight: { xs: '54px', sm: '64px' },
        boxShadow: (theme) => theme.shadows[2],
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
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
            aspectRatio: '1 / 1',
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
        maxWidth="100%"
      >
        <Box minWidth={0}>
          <Typography
            variant="h6"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: '1rem',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body3"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
        </Box>
      </Box>
    </Box>
  );
};
