import { useEffect } from 'react';
import { PuzzlePage } from '../components/Puzzle';
import { usePuzzle } from '../hooks/usePuzzle';
import { useRouter } from 'next/router';
import { urls } from '@worksheets/ui-games';

export function Index() {
  const puzzle = usePuzzle();
  const { push } = useRouter();

  // do not render the puzzle if the player has no puzzle configured at all.
  useEffect(() => {
    if (!puzzle.loading && !puzzle.words.length) {
      push(urls.relative.home);
    }
  }, [push, puzzle]);

  return <PuzzlePage />;
}

export default Index;
