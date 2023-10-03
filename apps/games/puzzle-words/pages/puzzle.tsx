import { FirstTimePlayerModal, Level, LevelComplete } from '../lib/components';
import { usePlayer, usePuzzle } from '../lib/hooks';
import { Box } from '@mui/material';
import { puzzles } from '../lib/puzzles';
import { GridPaperLayout } from '../lib/components/Layouts';

const Page = () => {
  const maxLevel = puzzles.length;

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
      <GridPaperLayout>
        <></>
      </GridPaperLayout>
    );

  // if the level is complete, show the victory screen.
  if (player.isComplete()) {
    return (
      <LevelComplete
        level={player.level}
        loadPuzzle={player.loadPuzzle}
        points={player.points}
        water={player.water}
      />
    );
  }

  return (
    <>
      <Level
        id={player.level}
        letters={puzzle.letters}
        rules={puzzle.rules}
        shuffleLetters={puzzle.shuffleLetters}
        points={player.points}
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
