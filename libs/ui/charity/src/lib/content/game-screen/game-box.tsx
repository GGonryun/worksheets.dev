import { Box, styled } from '@mui/material';

export const GameBox = styled(Box)(({ theme }) => ({
  height: 314,
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    minHeight: 314,
    gridRow: '1 / span 3',
    gridColumn: '1 / span 3',
  },
  [theme.breakpoints.up('mobile2')]: {
    height: '100%',
    gridRow: '1 / span 3',
    gridColumn: '2 / span 3',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '1 / span 4',
    gridColumn: '2 / span 4',
  },
  [theme.breakpoints.up('desktop1')]: {
    minHeight: 300,
    gridRow: '1 / span 4',
    gridColumn: '2 / span 6',
  },
  [theme.breakpoints.up('md')]: {
    gridRow: '1 / span 4',
    gridColumn: '2 / span 6',
  },
  [theme.breakpoints.up('desktop2')]: {
    minHeight: 400,
    gridRow: '1 / span 5',
    gridColumn: '2 / span 8',
  },
  [theme.breakpoints.up('desktop3')]: {
    minHeight: 500,
    gridRow: '1 / span 6',
    gridColumn: '2 / span 10',
  },
}));
