import { Box, styled } from '@mui/material';
import { GRID_ITEM_SIZE } from '../../games/mixed-grid-items';

export const ScreenBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: `repeat(auto-fill, ${GRID_ITEM_SIZE})`,
  gridAutoFlow: 'dense',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: `repeat(3, ${GRID_ITEM_SIZE})`,
  gap: theme.spacing(2),
  [theme.breakpoints.down('mobile2')]: {
    gap: theme.spacing(1),
  },
  [theme.breakpoints.up('mobile2')]: {
    gridTemplateColumns: `repeat(4, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: `repeat(5, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('desktop1')]: {
    gridTemplateColumns: `repeat(7, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `repeat(8, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('desktop2')]: {
    gridTemplateColumns: `repeat(9, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: `repeat(10, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('desktop3')]: {
    gridTemplateColumns: `repeat(12, ${GRID_ITEM_SIZE})`,
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: `repeat(13, ${GRID_ITEM_SIZE})`,
  },
}));
