import { Box, styled } from '@mui/material';

export const DescriptionBox = styled(Box)(({ theme }) => ({
  minHeight: 314,
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 4,
  [theme.breakpoints.up('xs')]: {
    gridRow: '6 / span 6',
    gridColumn: '1 / span 3',
  },
  [theme.breakpoints.up('mobile2')]: {
    gridRow: '6 / span 6',
    gridColumn: '1 / span 4',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '7 / span 6',
    gridColumn: '1 / span 5',
  },
  [theme.breakpoints.up('desktop1')]: {
    gridRow: '9 / span 5',
    gridColumn: '1 / span 7',
  },
  [theme.breakpoints.up('md')]: {
    gridRow: '8 / span 5',
    gridColumn: '1 / span 8',
  },
  [theme.breakpoints.up('desktop2')]: {
    gridRow: '9 / span 5',
    gridColumn: '1 / span 9',
  },
  [theme.breakpoints.up('lg')]: {
    gridRow: '9 / span 5',
    gridColumn: '1 / span 10',
  },
  [theme.breakpoints.up('desktop3')]: {
    gridRow: '10 / span 5',
    gridColumn: '1 / span 12',
  },
  [theme.breakpoints.up('xl')]: {
    gridRow: '10 / span 5',
    gridColumn: '1 / span 13',
  },
}));
