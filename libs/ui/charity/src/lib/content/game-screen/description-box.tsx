import { Box, styled } from '@mui/material';

export const DescriptionBox = styled(Box)(({ theme }) => ({
  minHeight: 314,
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 4,
  [theme.breakpoints.up('xs')]: {
    gridRow: '16 / span 6',
    gridColumn: '1 / span 3',
  },
  [theme.breakpoints.up('mobile2')]: {
    gridRow: '16 / span 6',
    gridColumn: '1 / span 4',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '15 / span 6',
    gridColumn: '1 / span 5',
  },
  [theme.breakpoints.up('desktop1')]: {
    gridRow: '15 / span 5',
    gridColumn: '1 / span 7',
  },
  [theme.breakpoints.up('md')]: {
    gridRow: '14 / span 5',
    gridColumn: '1 / span 8',
  },
  [theme.breakpoints.up('desktop2')]: {
    gridRow: '14 / span 5',
    gridColumn: '1 / span 9',
  },
  [theme.breakpoints.up('lg')]: {
    gridRow: '13 / span 5',
    gridColumn: '1 / span 10',
  },
  [theme.breakpoints.up('desktop3')]: {
    gridRow: '13 / span 5',
    gridColumn: '1 / span 12',
  },
  [theme.breakpoints.up('xl')]: {
    gridRow: '12 / span 5',
    gridColumn: '1 / span 13',
  },
}));