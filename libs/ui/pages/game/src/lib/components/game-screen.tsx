import { Box, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import { GameIcon, PaginatedGamesList } from '@worksheets/ui/components/games';
import {
  CastVote,
  DetailedGameInfo,
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
  UserVote,
} from '@worksheets/util/types';
import { FC } from 'react';

import { GameLauncher } from './game-launcher';

type GameScreenProps = {
  suggestions: DetailedGameInfo[];
  game: SerializableGameSchema;
  analytics: GameAnalyticsSchema;
  developer: DeveloperSchema;
  userVote: UserVote;
  onPlay: () => void;
  onVote: (vote: CastVote['vote']) => void;
};

export const GameScreen: FC<GameScreenProps> = ({
  suggestions,
  game,
  developer,
  analytics,
  userVote,
  onPlay,
  onVote,
}) => {
  const leftBar = suggestions.splice(0, 5);
  const rightBar = suggestions.splice(0, 5);
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box
        display="flex"
        gap={3}
        sx={{
          aspectRatio: { xs: '1/1', sm: '4/3', md: '14/9', lg: '16/9' },
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
          <GameLauncher
            game={game}
            developer={developer}
            onPlay={onPlay}
            onVote={onVote}
            userVote={userVote}
            analytics={analytics}
          />
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

const GameBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.soft,
  background: theme.palette.background['gradient-soft'],
  flex: 1,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 8,
  padding: theme.spacing(2, 3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const PaperSidebar = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.soft,
  background: theme.palette.background['gradient-soft'],
  minWidth: 90,

  padding: theme.spacing(2),
  boxSizing: 'content-box',
  overflow: 'scroll',
  borderRadius: theme.shape.borderRadius * 8,
  [theme.breakpoints.up('desktop2')]: {
    minWidth: 100,
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: 110,
  },
  [theme.breakpoints.up('desktop3')]: {
    minWidth: 128,
  },
}));
