import { PlayArrow } from '@mui/icons-material';
import { Box, Paper, styled, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { GameIcon, PaginatedGamesList } from '@worksheets/ui/components/games';
import { CoverImage, FillImage } from '@worksheets/ui/components/images';
import {
  DetailedGameInfo,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC } from 'react';

type GameScreenProps = {
  suggestions: DetailedGameInfo[];
  game: SerializableGameSchema;
  statistics: {
    plays: number;
    likes: number;
    dislikes: number;
  };
};

export const GameScreen: FC<GameScreenProps> = ({
  suggestions,
  game,
  statistics,
}) => {
  const leftBar = suggestions.splice(0, 5);
  const rightBar = suggestions.splice(0, 5);
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box
        display="flex"
        gap={3}
        sx={{
          aspectRatio: { xs: '1/1', sm: '4/3', md: '16/9' },
        }}
      >
        <PaperSidebar
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
          }}
        >
          {leftBar.map((g) => (
            <GameIcon
              key={g.id}
              id={g.id}
              name={''}
              caption={''}
              imageUrl={g.image}
            />
          ))}
        </PaperSidebar>

        <GameBox>
          <LauncherBox>
            <CoverImage src={game.bannerUrl} alt={game.name} />
          </LauncherBox>
          <BannerBox>
            <Box
              position="relative"
              sx={{
                aspectRatio: '1/1',
                height: '100%',
                width: 'auto',
              }}
            >
              <FillImage
                src={game.iconUrl}
                alt={game.name}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              />
            </Box>
            <Box>
              <Typography
                typography={{ xs: 'h6', sm: 'h5' }}
                color="text.blue.main"
              >
                {game.name}
              </Typography>
              <Box display="flex" gap={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <PlayArrow
                    fontSize="small"
                    sx={{ color: (theme) => theme.palette.text.blue.main }}
                  />
                  <Typography variant="body2" color="text.blue.main">
                    {statistics.plays}
                  </Typography>
                </Box>
                <Box>{statistics.likes}</Box>
                <Box>{statistics.dislikes}</Box>
              </Box>
            </Box>
          </BannerBox>
        </GameBox>
        <PaperSidebar
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
          }}
        >
          {rightBar.map((g) => (
            <GameIcon
              key={g.id}
              id={g.id}
              name={''}
              caption={''}
              imageUrl={g.image}
            />
          ))}
        </PaperSidebar>
      </Box>
      <Box>Game Description</Box>
      <Box>Suggested Categories</Box>
      <PaginatedGamesList
        title="More Games"
        games={suggestions.map((g) => ({
          id: g.id,
          name: g.name,
          caption: `${g.plays}+ Plays`,
          imageUrl: g.image,
        }))}
      />
    </Container>
  );
};

const BannerBox = styled(Box)(({ theme }) => ({
  flex: 1,
  maxHeight: 80,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    maxHeight: 64,
    gap: theme.spacing(1),
  },
}));

const LauncherBox = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background['solid-blue'],
  flex: 7,
  borderRadius: theme.shape.borderRadius * 8,
  overflow: 'hidden',
}));

const GameBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.soft,
  background: theme.palette.background['gradient-soft'],
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'content-box',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius * 8,
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

const PaperSidebar = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.soft,
  background: theme.palette.background['gradient-soft'],
  minWidth: 100,
  padding: theme.spacing(2),
  boxSizing: 'content-box',
  overflow: 'scroll',
  borderRadius: theme.shape.borderRadius * 8,
  [theme.breakpoints.up('lg')]: {
    minWidth: 100,
  },
}));
