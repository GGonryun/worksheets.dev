import { Box, Divider, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { Header } from './Header';
import { PlayerStorage, usePlayer } from '../../hooks/usePlayer';
import { useRouter } from 'next/router';
import { urls } from '../../util/urls';

import { Layout } from './Layout';
import { InfoModal } from './InfoModal';
import { listPuzzles } from '../../puzzles';
import {
  dokaBoxShadow,
  tabletBoxShadow,
  textShadow,
} from '@worksheets/ui-games';
import { PuzzleItem } from '../../util/types';
import { Check, Lock, QuestionMark } from '@mui/icons-material';
import Image from 'next/image';

const puzzleLevelSize = 84;
export const Page: FC = () => {
  const player = usePlayer();
  const puzzles = listPuzzles();
  const { push } = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Layout>
        <Header
          onHome={() => push(urls.home())}
          onInfo={() => setShowInfo(true)}
        />
        <Box py={1}>
          <Divider sx={{ backgroundColor: 'white' }} />
        </Box>
        <Box
          overflow="auto"
          maxHeight={'85%'}
          p={1}
          display="flex"
          flexWrap={'wrap'}
          flexDirection={'row'}
          alignItems={'start'}
          justifyContent={'center'}
        >
          {puzzles.map((puzzle) => (
            <LevelCard puzzle={puzzle} key={puzzle.id} player={player} />
          ))}
        </Box>
      </Layout>
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
};

export const LevelCard: FC<{
  puzzle: PuzzleItem;
  player: PlayerStorage;
}> = ({ puzzle, player }) => {
  const { push } = useRouter();
  const completed = player.completed.includes(puzzle.id);
  const locked = puzzle.requires > player.completed.length;
  return (
    <Box
      className="level-card"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={'flex-start'}
      m={0.5}
    >
      <LevelLayout
        completed={completed}
        locked={locked}
        onClick={() => {
          push(urls.puzzle(puzzle.id));
        }}
      >
        <Box
          sx={{
            height: puzzleLevelSize,
            width: puzzleLevelSize,
            // blur
            filter: locked ? 'blur(5px)' : undefined,
          }}
        >
          {!completed ? (
            <QuestionMark
              sx={{
                height: puzzleLevelSize,
                width: puzzleLevelSize,
                opacity: 0.5,
              }}
            />
          ) : (
            <Image
              src={puzzle.image}
              alt={puzzle.name}
              width={puzzleLevelSize}
              height={puzzleLevelSize}
            />
          )}
        </Box>
      </LevelLayout>
      <Typography
        color="primary.contrastText"
        variant="caption"
        width={puzzleLevelSize}
        textAlign={'center'}
        sx={{
          textShadow: textShadow(1, 0.9),
        }}
      >
        {locked
          ? `${
              puzzle.requires - player.completed.length
            } more puzzles to unlock`
          : puzzle.name}
      </Typography>
    </Box>
  );
};

export const LevelLayout: FC<{
  children: ReactNode;
  onClick?: () => void;
  completed?: boolean;
  locked?: boolean;
}> = ({ completed, locked, children, onClick }) => {
  return (
    <Box position="relative" onClick={locked ? undefined : onClick}>
      {completed && (
        // show a checkmark overlayed on the puzzle
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Check
            sx={{
              fontSize: '5rem',
              color: (theme) => theme.palette.success.main,
              opacity: 0.5,
            }}
          />
        </Box>
      )}
      {locked && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Lock
            sx={{
              fontSize: '5rem',
              color: (theme) => theme.palette.error.main,
              opacity: 0.5,
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'inline-block',
          m: 0.5,
          backgroundColor: 'white',
          borderRadius: 2,
          height: puzzleLevelSize,
          width: puzzleLevelSize,
          pb: '2px',
          border: `3px solid black`,
          boxShadow: `${dokaBoxShadow}, ${tabletBoxShadow}`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
