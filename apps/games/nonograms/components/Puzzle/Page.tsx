import { Box } from '@mui/material';
import { cow } from '../../puzzles';
import { backgroundColor, generateNonogram } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';
import { useLocalStorage, useWindowSize } from '@worksheets/ui-core';
import { ActionsBar } from './ActionsBar/ActionsBar';
import { longest } from '../../util';
import { Nonogram } from './Nonogram';
import { Header } from './Header';
import { useNonogramPencil } from '../../hooks/useNonogramPencil';
import { NonogramSelections } from '../../util/types';

const useNonogramStorage = (id: number) => {
  const [selections, setSelections] = useLocalStorage<
    Record<string, NonogramSelections>
  >('nonograms', []);

  return {
    selections,
    setSelections,
  };
};

export const Page = () => {
  const [width, height] = useWindowSize();
  const puzzle = cow;
  const nonogram = generateNonogram(puzzle);

  const longestRow = longest(nonogram.rows);

  const pencil = useNonogramPencil(nonogram);

  const heightOffset = 200; // for toolbar and header
  const smallestSize = Math.min(width, height - heightOffset);
  const boxSize = smallestSize / (nonogram.solution.length + longestRow) / 1.25;
  const size = Math.min(boxSize, 40);

  return (
    <Layout>
      {pencil.levelComplete && <Box>Level Complete!</Box>}
      <Header windowHeight={height} size={size} />
      <Nonogram nonogram={nonogram} size={size} {...pencil} />
      <ActionsBar
        size={size}
        disabled={pencil.levelComplete}
        prices={pencil.prices}
        action={pencil.action}
        setAction={pencil.setAction}
        onReset={pencil.onReset}
        onUndo={pencil.onUndo}
        onRedo={pencil.onRedo}
        canReset={pencil.hasData}
        canUndo={pencil.undos.length > 0}
        canRedo={pencil.redos.length > 0}
        tokens={pencil.tokens}
      />
    </Layout>
  );
};

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'grid',
      placeItems: 'center',
      backgroundColor: (theme) => backgroundColor(theme),
    }}
  >
    {children}
  </Box>
);
