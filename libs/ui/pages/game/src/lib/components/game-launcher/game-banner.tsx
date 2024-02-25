import {
  Fullscreen,
  FullscreenExit,
  PlayArrow,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import theme from '@worksheets/ui/theme';
import { shorthandNumber } from '@worksheets/util/numbers';
import { CastVote, GameSchema, Vote } from '@worksheets/util/types';
import { FC, JSXElementConstructor } from 'react';

export type GameBannerProps = {
  type: GameSchema['file']['type'];
  iconUrl: string;
  developer: string;
  name: string;
  isFullscreen?: boolean;
  userVote?: Vote;
  plays: number;
  likes: number;
  dislikes: number;
  onFullscreen?: () => void;
  onVote: (vote: CastVote['vote']) => void;
};

export const GameBanner: FC<GameBannerProps> = ({
  iconUrl,
  name,
  developer,
  type,
  isFullscreen,
  plays,
  likes,
  dislikes,
  userVote,
  onFullscreen,
  onVote,
}) => (
  <Box
    sx={{
      display: 'flex',
      mt: { xs: 1, sm: 2 },
      height: { xs: '64px', sm: '80px' },
      minHeight: { xs: '64px', sm: '80px' },
      maxHeight: { xs: '64px', sm: '80px' },
      boxSizing: 'border-box',
      overflow: 'hidden',
      userSelect: 'none',
      gap: { xs: 0.5, sm: 1 },
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
      <Box
        minWidth={0}
        sx={{
          '& > h6': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      >
        <Typography
          color="text.blue.light"
          typography={{ xs: 'h5', sm: 'h4' }}
          component="h6"
        >
          {name}
        </Typography>
        <Typography
          typography={{ xs: 'body3', sm: 'body2' }}
          component="h6"
          color={(theme) => theme.palette.text.blue.light}
          sx={{
            fontWeight: 500,
          }}
        >
          by {developer}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        px={{ xs: 1, sm: 2 }}
        gap={{ xs: 1, sm: 2 }}
      >
        <ActionBox>
          <ActionButton disabled>
            <PlayArrow
              sx={{
                color: theme.palette.text.blue.light,
              }}
            />
          </ActionButton>
          <ActionText>{shorthandNumber(plays)}</ActionText>
        </ActionBox>
        <ActionBox>
          <ActionButton onClick={() => onVote('up')}>
            {userVote != null && userVote === 'up' ? (
              <ThumbUpAlt />
            ) : (
              <ThumbUpOffAlt />
            )}
          </ActionButton>
          <ActionText>{shorthandNumber(likes)}</ActionText>
        </ActionBox>
        <ActionBox>
          <ActionButton onClick={() => onVote('down')}>
            {userVote != null && userVote === 'down' ? (
              <ThumbDownAlt />
            ) : (
              <ThumbDownOffAlt />
            )}
          </ActionButton>
          <ActionText>{shorthandNumber(dislikes)}</ActionText>
        </ActionBox>
        {type === 'HTML' && (
          <ActionButton onClick={onFullscreen}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </ActionButton>
        )}
      </Box>
    </Box>
  </Box>
);

const ActionButton = styled<JSXElementConstructor<IconButtonProps>>((props) => (
  <IconButton size="small" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.blue.light,
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ActionText = styled<JSXElementConstructor<TypographyProps>>((props) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.blue.light,
  fontWeight: 500,
}));
