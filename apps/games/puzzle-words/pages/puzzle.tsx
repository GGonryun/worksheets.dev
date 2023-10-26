import { FirstTimePlayerModal, Level } from '../lib/components';
import { usePlayer, usePuzzle } from '../lib/hooks';
import { Box, CircularProgress } from '@mui/material';
import { puzzles } from '../lib/puzzles';
import { Layout } from '../lib/components/Layout';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { PuzzleCompleteModal, urls } from '@worksheets/ui-games';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

const Page = () => {
  const maxLevel = puzzles.length;
  const { push } = useRouter();

  // offset by 1 because the level is 0-indexed
  const player = usePlayer();
  const puzzle = usePuzzle(player.level);

  if (
    Number.isNaN(player.level) ||
    Number.isNaN(player.level) ||
    player.level >= maxLevel
  ) {
    return <Box>Level does not exist</Box>;
  }
  // this temporary loading state makes sure that we register the play area after the puzzle is loaded.
  // this guarantees that the play area's rects are registered in the correct position.
  if (puzzle.loading)
    return (
      <Layout
        content={
          <AbsolutelyCentered>
            <CircularProgress size={128} color="secondary" />
          </AbsolutelyCentered>
        }
        header={undefined}
      />
    );

  const levelComplete = player.isComplete();
  return (
    <>
      {levelComplete && (
        <Box zIndex={2000}>
          <Confetti numberOfPieces={50} />
        </Box>
      )}
      {/* if the level is complete, show the victory screen. */}
      <PuzzleCompleteModal
        open={levelComplete}
        gameOver={player.isGameOver()}
        onClose={() => {
          // do not allow closing
        }}
        onMenu={() => {
          push(urls.relative.home);
        }}
        onContinue={() => player.loadPuzzle(player.level + 1)}
      />
      <Level
        id={player.level}
        letters={puzzle.letters}
        rules={puzzle.rules}
        shuffleLetters={puzzle.shuffleLetters}
        tokens={player.tokens}
        water={player.water}
        hints={player.hints}
        words={player.words}
        bonuses={player.bonuses}
        submitWord={player.submitWord}
        purchasePowerUp={player.purchasePowerUp}
      />

      <FirstTimePlayerModal
        open={player.isFirstTime}
        onClose={player.acknowledgeFirstTime}
      />
    </>
  );
};

export default Page;
