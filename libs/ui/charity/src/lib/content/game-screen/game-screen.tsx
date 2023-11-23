import { Box, styled } from '@mui/material';
import { FC } from 'react';
import { ScreenBox } from './screen-box';
import { GameBox } from './game-box';
import { MixedGridItem, MixedGridItems } from '../../games/mixed-grid-items';

type GameScreenProps = {
  suggestions: MixedGridItem[];
};

export const GameScreen: FC<GameScreenProps> = ({ suggestions }) => {
  return (
    <ScreenBox>
      <MixedGridItems items={suggestions} />
      <GameBox>Game Section</GameBox>
      <DescriptionBox>Description Section</DescriptionBox>
    </ScreenBox>
  );
};

export const DescriptionBox = styled(Box)(({ theme }) => ({
  minHeight: 314,
  height: '100%',
  width: '100%',
  backgroundColor: 'red',
  [theme.breakpoints.up('xs')]: {
    gridRow: '14 / span 6',
    gridColumn: '1 / span 3',
  },
  [theme.breakpoints.up('mobile2')]: {
    gridRow: '14 / span 6',
    gridColumn: '1 / span 4',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '13 / span 6',
    gridColumn: '1 / span 5',
  },
  [theme.breakpoints.up('desktop1')]: {
    gridRow: '13 / span 5',
    gridColumn: '1 / span 7',
  },
  [theme.breakpoints.up('md')]: {
    gridRow: '12 / span 5',
    gridColumn: '1 / span 8',
  },
  [theme.breakpoints.up('desktop2')]: {
    gridRow: '12 / span 5',
    gridColumn: '1 / span 9',
  },
  [theme.breakpoints.up('lg')]: {
    gridRow: '11 / span 5',
    gridColumn: '1 / span 10',
  },
  [theme.breakpoints.up('desktop3')]: {
    gridRow: '11 / span 5',
    gridColumn: '1 / span 12',
  },
  [theme.breakpoints.up('xl')]: {
    gridRow: '10 / span 5',
    gridColumn: '1 / span 13',
  },
}));
