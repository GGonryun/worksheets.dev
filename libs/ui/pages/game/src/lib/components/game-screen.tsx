import { Box, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import {
  Game,
  GamesGroup,
  RandomGameButton,
} from '@worksheets/ui/components/games';
import {
  BasicGameInfo,
  CastVote,
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import { FC } from 'react';

import { GameDescription } from './game-description';
import { GameLauncher } from './game-launcher';

type GameScreenProps = {
  suggestions: BasicGameInfo[];
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  userVote?: Vote;
  onPlay: () => void;
  onVote: (vote: CastVote['vote']) => void;
  onShare: () => void;
  onReport: () => void;
};

export const GameScreen: FC<GameScreenProps> = ({
  suggestions,
  game,
  developer,
  userVote,
  onPlay,
  onVote,
  onShare,
  onReport,
}) => {
  const leftBar = suggestions.slice(0, 5);
  const rightBar = suggestions.slice(6, 11);
  const remaining = suggestions.slice(12);
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
      }}
    >
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
            <Game key={g.id} id={g.id} name={''} imageUrl={g.imageUrl} />
          ))}
        </PaperSidebar>

        <GameBox>
          <GameLauncher
            game={game}
            developer={developer}
            onPlay={onPlay}
            onVote={onVote}
            userVote={userVote}
          />
        </GameBox>

        <PaperSidebar
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
          }}
        >
          {rightBar.map((g) => (
            <Game key={g.id} id={g.id} name={''} imageUrl={g.imageUrl} />
          ))}
        </PaperSidebar>
      </Box>
      <GameDescription
        description={game.description}
        devices={game.viewport.devices}
        onShare={onShare}
        onReport={onReport}
      />
      <GamesGroup
        title="More Games"
        header={<RandomGameButton />}
        games={remaining}
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
