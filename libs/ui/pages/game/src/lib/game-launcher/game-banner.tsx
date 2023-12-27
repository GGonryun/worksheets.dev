import {
  Box,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import {
  Favorite,
  FavoriteBorder,
  Fullscreen,
  FullscreenExit,
  PlayCircleOutlineOutlined,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { GameSchema } from '@worksheets/util/types';
import { ResponsiveImage } from '@worksheets/ui/images';

export type GameBannerProps = {
  type: GameSchema['file']['type'];
  iconUrl: string;
  developer: string;
  name: string;
  isFullscreen?: boolean;
  isFavorite: boolean;
  userVote: 'up' | 'down' | null;
  plays: string;
  upVotes: string;
  downVotes: string;
  onFavorite: () => void;
  onFullscreen?: () => void;
  onViewGamePlay: () => void;
  onVote: (vote: 'up' | 'down') => void;
};

export const GameBanner: FC<GameBannerProps> = ({
  iconUrl,
  name,
  developer,
  type,
  isFullscreen,
  plays,
  upVotes,
  downVotes,
  isFavorite,
  userVote,
  onFullscreen,
  onVote,
  onFavorite,
  onViewGamePlay,
}) => (
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
      <Box
        minWidth={0}
        sx={{
          '& > h6': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: '1rem',
          },
        }}
      >
        <Typography variant="h6" component="h6">
          {name}
        </Typography>
        <Typography
          variant="body3"
          component="h6"
          sx={{
            fontWeight: 400,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          by {developer}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        px={{ xs: 1, sm: 2 }}
        gap={{ xs: 1, sm: 3 }}
      >
        <ActionBox>
          <ActionButton onClick={onViewGamePlay}>
            <PlayCircleOutlineOutlined />
          </ActionButton>
          <ActionText>{plays}</ActionText>
        </ActionBox>
        <ActionBox>
          <ActionButton onClick={() => onVote('up')}>
            {userVote === 'up' ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
          </ActionButton>
          <ActionText>{upVotes}</ActionText>
        </ActionBox>
        <ActionBox>
          <ActionButton onClick={() => onVote('down')}>
            {userVote === 'down' ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
          </ActionButton>
          <ActionText>{downVotes}</ActionText>
        </ActionBox>
        <ActionButton onClick={onFavorite}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </ActionButton>
        {type === 'iframe' && (
          <ActionButton onClick={onFullscreen}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </ActionButton>
        )}
      </Box>
    </Box>
  </Box>
);

const ActionButton = styled<JSXElementConstructor<IconButtonProps>>((props) => (
  <IconButton size="small" color="primary" {...props} />
))(({ theme }) => ({
  color: theme.palette.primary.main,
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
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.dangrek.fontFamily,
}));
